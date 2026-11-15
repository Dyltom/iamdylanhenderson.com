# iamdylanhenderson.com

## Commands

- `bun install`, then `bun run verify` (lint, typecheck, Vitest, build; summary line last). CI runs it plus `bun run format:check`; the Guardrails workflow runs the checks in `.guardrails/`.
- The app runs on Node 24 (`.nvmrc`); Bun is only the package manager.
- `.guardrails/` and `.harness-version` are installed from `Dyltom/home` (`tools/guardrails/install.sh`). Change them there, not here.

## Writing

- Use Australian English in all text and user-facing content: -ise (optimise, organisation), -our (colour, behaviour), -re (centre), "programme" for computer programs.

## CV

- `cv.txt` and `cv_backup_*.txt` are the owner's source CV text. Do not edit them.
- CV exports (PDF/DOCX) must stay ATS-compatible: plain structure, white background.
- Dates on the CV use the Australian DD/MM/YYYY format.

## Git

- Commit with `git smart-commit` after completing a task.
