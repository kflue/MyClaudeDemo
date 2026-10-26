#!/usr/bin/env node
// PostToolUse hook: run the project's Prettier on files Claude edited.
// Never blocks; formatting failures are reported but ignored.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const input = JSON.parse(await new Response(process.stdin).text());
const filePath = input.tool_input?.file_path;
const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const prettier = join(projectDir, 'node_modules', '.bin', 'prettier');
const formattable = new Set(['.ts', '.html', '.scss', '.css', '.json', '.md', '.mjs', '.js']);

if (filePath && formattable.has(extname(filePath)) && existsSync(prettier)) {
  try {
    execFileSync(prettier, ['--write', '--ignore-unknown', filePath], {
      cwd: projectDir,
      stdio: ['ignore', 'ignore', 'pipe'],
    });
  } catch (err) {
    console.error(`prettier failed for ${filePath}: ${err.stderr?.toString().trim()}`);
  }
}
