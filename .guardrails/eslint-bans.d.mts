import type { ESLint, Linter } from "eslint";

export declare const MESSAGES: Record<string, string>;

export declare const plugin: ESLint.Plugin;

export declare function guardrailBans(options?: {
  hooks?: string[];
  timers?: string[];
  env?: string[];
  vendors?: string[];
  adapters?: string[];
  severity?: Linter.RuleSeverity;
}): Linter.Config[];
