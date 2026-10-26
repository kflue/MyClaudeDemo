#!/usr/bin/env node
// PreToolUse hook: block Claude from editing secrets and generated lock files.
// Exit code 2 blocks the tool call and shows stderr to Claude.
import { basename } from 'node:path';

const input = JSON.parse(await new Response(process.stdin).text());
const filePath = input.tool_input?.file_path ?? input.tool_input?.notebook_path ?? '';
const name = basename(filePath);

const rules = [
  [/^\.env(\..*)?$/, 'Environment files may contain secrets; edit them manually.'],
  [
    /^(package-lock\.json|yarn\.lock|pnpm-lock\.yaml)$/,
    'Lock files are generated; run npm install instead.',
  ],
];

for (const [pattern, reason] of rules) {
  if (pattern.test(name)) {
    console.error(`Blocked edit of ${filePath}: ${reason}`);
    process.exit(2);
  }
}
