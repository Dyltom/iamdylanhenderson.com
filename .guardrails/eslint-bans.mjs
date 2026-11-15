const ALLOWLIST = "Allowlist: the options passed to guardrailBans() in eslint.config.mjs (owner-approved PRs only).";

const TIMERS = new Set(["setTimeout", "requestAnimationFrame", "requestIdleCallback"]);
const SERVER_IMPORT = /^(server-only|node:.+|fs|fs\/promises|path|child_process|crypto)$|(^|\/)(server|db)(\/|$)/;

const calleeName = (node) =>
  node.callee.type === "Identifier"
    ? node.callee.name
    : node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier"
      ? node.callee.property.name
      : null;

export const MESSAGES = {
  "no-use-effect":
    "useEffect/useLayoutEffect is banned outside the hooks folder: effects are the usual source of render loops and stale state. Instead derive the value during render, handle it in the event handler, fetch in a server component, or use useSyncExternalStore; if it truly must be an effect, put it in a named hook in the hooks folder. " +
    ALLOWLIST,
  "no-timer-fix":
    "setTimeout/requestAnimationFrame/requestIdleCallback in app and component code usually papers over an ordering bug. Instead fix the ordering (await the promise, use the event or state that signals readiness); put real scheduling in a hook in the hooks folder. " +
    ALLOWLIST,
  "no-process-env":
    "process.env is read only in the env module, so every variable is validated and typed in one place. Import the value from the env module instead. " +
    ALLOWLIST,
  "client-server-boundary":
    'A "use client" file imports server-only code (server-only, node builtins, or a server/ or db/ module), which leaks secrets or breaks the bundle. Instead pass the data in as props from a server component, or call a server action. ' +
    ALLOWLIST,
};

const reportCalls = (id, match) => ({
  meta: { type: "problem", messages: { banned: MESSAGES[id] }, schema: [] },
  create: (context) => ({
    CallExpression(node) {
      if (match(calleeName(node))) context.report({ node, messageId: "banned" });
    },
  }),
});

export const plugin = {
  rules: {
    "no-use-effect": reportCalls("no-use-effect", (name) => name === "useEffect" || name === "useLayoutEffect"),
    "no-timer-fix": reportCalls("no-timer-fix", (name) => TIMERS.has(name)),
    "no-process-env": {
      meta: { type: "problem", messages: { banned: MESSAGES["no-process-env"] }, schema: [] },
      create: (context) => ({
        MemberExpression(node) {
          if (node.object.type === "Identifier" && node.object.name === "process" && node.property.name === "env") {
            context.report({ node, messageId: "banned" });
          }
        },
      }),
    },
    "client-server-boundary": {
      meta: { type: "problem", messages: { banned: MESSAGES["client-server-boundary"] }, schema: [] },
      create: (context) => {
        let client = false;
        return {
          Program(node) {
            client = node.body.some((s) => s.type === "ExpressionStatement" && s.directive === "use client");
          },
          ImportDeclaration(node) {
            if (client && SERVER_IMPORT.test(node.source.value)) context.report({ node, messageId: "banned" });
          },
        };
      },
    },
  },
};

const CODE = ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"];

export function guardrailBans({
  hooks = ["**/hooks/**"],
  timers = ["**/app/**", "**/components/**"],
  env = ["**/env.{ts,mjs,js}", "**/*.config.{ts,mjs,js,cjs}", "scripts/**"],
  severity = "warn",
} = {}) {
  return [
    { ignores: [".guardrails/**"] },
    {
      files: CODE,
      plugins: { guardrails: plugin },
      rules: {
        "guardrails/client-server-boundary": severity,
        "no-extend-native": severity,
        "no-proto": severity,
      },
    },
    { files: CODE, ignores: hooks, plugins: { guardrails: plugin }, rules: { "guardrails/no-use-effect": severity } },
    { files: timers, ignores: hooks, plugins: { guardrails: plugin }, rules: { "guardrails/no-timer-fix": severity } },
    { files: CODE, ignores: env, plugins: { guardrails: plugin }, rules: { "guardrails/no-process-env": severity } },
  ];
}
