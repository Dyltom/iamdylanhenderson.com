# iamdylanhenderson.com

## Commands

- `bun install`, then `bun run lint`, `bun run typecheck`, `bun run test` (Vitest) and `bun run build`. CI runs all of these plus `bun run format:check` and, on pull requests, `bun scripts/no-comments.ts`.
- The app runs on Node 24 (`.nvmrc`); Bun is only the package manager.
- `scripts/no-comments.ts` is a verbatim copy of a shared tool. Re-sync it rather than editing it.

## Writing

- Use Australian English in all text and user-facing content: -ise (optimise, organisation), -our (colour, behaviour), -re (centre), "programme" for computer programs.

## CV

- `cv.txt` and `cv_backup_*.txt` are the owner's source CV text. Do not edit them.
- CV exports (PDF/DOCX) must stay ATS-compatible: plain structure, white background.
- Dates on the CV use the Australian DD/MM/YYYY format.

## Git

- Commit with `git smart-commit` after completing a task.
