import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { guardrailBans } from './.guardrails/eslint-bans.mjs';

export default defineConfig([
  ...guardrailBans(),
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
  ]),
]);
