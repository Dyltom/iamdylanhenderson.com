import ts from "typescript";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, extname, join, relative, resolve } from "node:path";

const SCOPES = (process.env.NO_COMMENTS_SCOPE?.split(":").filter(Boolean) ?? [
  join(homedir(), "repos", "work"),
  join(homedir(), "orca", "workspaces"),
]).map((dir) => resolve(dir));
const MAX_STOP_BLOCKS = 3;
const ALLOW_FILE = ".comment-allow";

const EXTENSIONS = new Set([".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"]);

const SKIPPED_PATHS = [
  /(^|\/)node_modules\//,
  /(^|\/)\.next\//,
  /(^|\/)(dist|build|out|coverage)\//,
  /(^|\/)drizzle\//,
  /(^|\/)generated\//,
  /\.d\.[mc]?ts$/,
  /\.min\.js$/,
];

const TOOL_DIRECTIVES = [
  /^\/\/\/\s*<reference\b/,
  /^\/\/\s*@vitest-environment\b/,
  /^\/\/\s*@jest-environment\b/,
  /^\/\/\s*@ts-check\b/,
  /^\/\*\*?\s*@jsx(ImportSource|Runtime|Frag)?\b/,
  /^\/\*\s*[#@]__(PURE|NO_SIDE_EFFECTS)__\s*\*\/$/,
  /^\/\*\s*webpack[A-Z]\w*\s*:/,
  /^\/\*\s*@vite-ignore\s*\*\/$/,
];

const SUPPRESSION = /(eslint-disable|@ts-ignore|@ts-expect-error|@ts-nocheck|biome-ignore|prettier-ignore|istanbul ignore|c8 ignore)/;

export type Finding = { line: number; text: string; suppression: boolean };

export function findComments(source: string, fileName: string): Finding[] {
  const kind = /\.[mc]?tsx?$/.test(fileName)
    ? fileName.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
    : fileName.endsWith("x") ? ts.ScriptKind.JSX : ts.ScriptKind.JS;
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, kind);
  const seen = new Set<number>();
  const findings: Finding[] = [];

  const collect = (pos: number) => {
    const ranges = [
      ...(ts.getTrailingCommentRanges(source, pos) ?? []),
      ...(ts.getLeadingCommentRanges(source, pos) ?? []),
    ];
    for (const range of ranges) {
      if (seen.has(range.pos)) continue;
      seen.add(range.pos);
      const text = source.slice(range.pos, range.end);
      if (TOOL_DIRECTIVES.some((re) => re.test(text))) continue;
      findings.push({
        line: sf.getLineAndCharacterOfPosition(range.pos).line + 1,
        text: text.split(/\r?\n/)[0].trim(),
        suppression: SUPPRESSION.test(text),
      });
    }
  };

  const visit = (node: ts.Node) => {
    if (node.kind === ts.SyntaxKind.JsxText) return;
    if (node.getChildCount(sf) === 0) {
      collect(node.pos);
      return;
    }
    for (const child of node.getChildren(sf)) visit(child);
  };

  visit(sf);
  collect(sf.endOfFileToken.pos);
  return findings.sort((a, b) => a.line - b.line);
}

function git(cwd: string, args: string[]): string {
  try {
    return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return "";
  }
}

function repoRoot(path: string): string | null {
  const dir = existsSync(path) && !extname(path) ? path : dirname(path);
  const root = git(dir, ["rev-parse", "--show-toplevel"]).trim();
  return root ? resolve(root) : null;
}

function inScope(path: string): boolean {
  return SCOPES.some((scope) => {
    const rel = relative(scope, resolve(path));
    return rel !== "" && !rel.startsWith("..") && !/^[a-zA-Z]:/.test(rel);
  });
}

function baseRef(root: string): string {
  const explicit = process.env.NO_COMMENTS_BASE;
  if (explicit) {
    const mergeBase = git(root, ["merge-base", "HEAD", explicit]).trim();
    if (mergeBase) return mergeBase;
  }
  const upstream = git(root, ["rev-parse", "--abbrev-ref", "origin/HEAD"]).trim();
  if (upstream) {
    const mergeBase = git(root, ["merge-base", "HEAD", upstream]).trim();
    if (mergeBase) return mergeBase;
  }
  return "HEAD";
}

function addedLines(root: string, base: string, rel: string): Set<number> | "all" {
  const tracked = git(root, ["ls-files", "--error-unmatch", "--", rel]).trim();
  if (!tracked) return "all";
  const diff = git(root, ["diff", "-U0", "--no-color", "--no-ext-diff", base, "--", rel]);
  const lines = new Set<number>();
  for (const match of diff.matchAll(/^@@ -\S+ \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(match[1]);
    const count = match[2] === undefined ? 1 : Number(match[2]);
    for (let i = 0; i < count; i++) lines.add(start + i);
  }
  return lines;
}

function allowPatterns(root: string): string[] {
  const file = join(root, ALLOW_FILE);
  if (!existsSync(file)) return [];
  return readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

function checkable(rel: string, allow: string[]): boolean {
  if (!EXTENSIONS.has(extname(rel))) return false;
  if (SKIPPED_PATHS.some((re) => re.test(rel))) return false;
  return !allow.some((pattern) => new Bun.Glob(pattern).match(rel));
}

type Violation = { file: string } & Finding;

function checkFile(root: string, base: string, rel: string, allow: string[]): Violation[] {
  const abs = join(root, rel);
  if (!checkable(rel, allow) || !existsSync(abs)) return [];
  const added = addedLines(root, base, rel);
  if (added !== "all" && added.size === 0) return [];
  const source = readFileSync(abs, "utf8");
  return findComments(source, rel)
    .filter(
      (f) =>
        added === "all" ||
        added.has(f.line) ||
        (f.text.startsWith("/*") && hasAddedLineInBlock(source, f.line, added)),
    )
    .map((f) => ({ file: rel, ...f }));
}

function hasAddedLineInBlock(source: string, startLine: number, added: Set<number>): boolean {
  const lines = source.split(/\r?\n/);
  for (let i = startLine - 1; i < lines.length; i++) {
    if (added.has(i + 1)) return true;
    if (lines[i].includes("*/")) return false;
  }
  return false;
}

export function checkRepo(root: string): Violation[] {
  const base = baseRef(root);
  const changed = git(root, ["diff", "--name-only", "--no-renames", base]).split("\n");
  const untracked = git(root, ["ls-files", "--others", "--exclude-standard"]).split("\n");
  const allow = allowPatterns(root);
  const files = [...new Set([...changed, ...untracked].map((f) => f.trim()).filter(Boolean))];
  return files.flatMap((rel) => checkFile(root, base, rel, allow));
}

function checkPath(path: string): Violation[] {
  const root = repoRoot(path);
  if (!root) return [];
  const rel = relative(root, resolve(path)).replaceAll("\\", "/");
  return checkFile(root, baseRef(root), rel, allowPatterns(root));
}

function report(violations: Violation[], root?: string): string {
  const where = root ? ` in ${root}` : "";
  const list = violations
    .map((v) => `  ${v.file}:${v.line}  ${v.text.length > 90 ? v.text.slice(0, 87) + "..." : v.text}`)
    .join("\n");
  const suppressions = violations.some((v) => v.suppression)
    ? "\nSuppressions (eslint-disable, @ts-ignore, @ts-expect-error, biome-ignore): fix the underlying error, or wrap an incorrectly-typed third-party API in a typed adapter."
    : "";
  return `No comments policy: remove the new comments${where}.
${list}

Don't reword them. Fix the reason they exist:
- Explains what code does: rename or split it until it doesn't need explaining.
- Explains why: put it in the commit message.
- States a rule ("must", "don't", "always"): encode it as a type, test, or lint rule.${suppressions}
Only the user can grant an exception, by adding a path glob to ${ALLOW_FILE} at the repo root.`;
}

type HookInput = {
  session_id?: string;
  cwd?: string;
  tool_name?: string;
  tool_input?: { file_path?: string; notebook_path?: string };
};

function sessionStateFile(sessionId: string): string {
  return join(tmpdir(), `no-comments-${sessionId.replace(/[^\w-]/g, "")}.json`);
}

type SessionState = { repos: string[]; blocks: number };

function readState(sessionId: string): SessionState {
  try {
    return JSON.parse(readFileSync(sessionStateFile(sessionId), "utf8"));
  } catch {
    return { repos: [], blocks: 0 };
  }
}

function writeState(sessionId: string, state: SessionState) {
  writeFileSync(sessionStateFile(sessionId), JSON.stringify(state));
}

async function readStdin(): Promise<HookInput> {
  try {
    return JSON.parse(await Bun.stdin.text());
  } catch {
    return {};
  }
}

async function postToolUse() {
  const input = await readStdin();
  const file = input.tool_input?.file_path;
  if (!file || !inScope(file)) return 0;
  const root = repoRoot(file);
  if (!root) return 0;
  if (input.session_id) {
    const state = readState(input.session_id);
    if (!state.repos.includes(root)) state.repos.push(root);
    writeState(input.session_id, state);
  }
  const violations = checkPath(file);
  if (violations.length === 0) return 0;
  console.error(report(violations));
  return 2;
}

async function stop() {
  const input = await readStdin();
  const state = input.session_id ? readState(input.session_id) : { repos: [], blocks: 0 };
  const cwdRoot = input.cwd && inScope(input.cwd) ? repoRoot(input.cwd) : null;
  const repos = [...new Set([...state.repos, ...(cwdRoot ? [cwdRoot] : [])])];
  const failures = repos
    .map((root) => ({ root, violations: checkRepo(root) }))
    .filter((r) => r.violations.length > 0);

  if (failures.length === 0) {
    if (input.session_id && state.blocks > 0) writeState(input.session_id, { ...state, blocks: 0 });
    return 0;
  }

  const message = failures.map((f) => report(f.violations, f.root)).join("\n\n");
  if (state.blocks >= MAX_STOP_BLOCKS) {
    if (input.session_id) writeState(input.session_id, { ...state, blocks: 0 });
    console.log(JSON.stringify({
      systemMessage: `no-comments: still failing after ${MAX_STOP_BLOCKS} attempts; letting the session stop. CI will catch it.\n${message}`,
    }));
    return 0;
  }
  if (input.session_id) writeState(input.session_id, { ...state, blocks: state.blocks + 1 });
  console.error(message);
  return 2;
}

function cli(paths: string[]) {
  const targets = paths.length ? paths : [process.cwd()];
  let total = 0;
  for (const target of targets) {
    const isDir = existsSync(target) && !extname(target);
    const root = repoRoot(target);
    if (!root) continue;
    const violations = isDir ? checkRepo(root) : checkPath(target);
    if (violations.length) {
      console.error(report(violations, root));
      total += violations.length;
    }
  }
  return total > 0 ? 1 : 0;
}

if (import.meta.main) {
  const [mode, ...rest] = process.argv.slice(2);
  const code =
    mode === "--hook-post" ? await postToolUse()
    : mode === "--hook-stop" ? await stop()
    : cli(mode ? [mode, ...rest] : []);
  process.exit(code);
}
