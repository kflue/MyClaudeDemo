# MyClaudeDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.4.

## Develop in GitHub Codespaces

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/kflue/MyClaudeDemo)

The dev container (`.devcontainer/devcontainer.json`) provides Node 24, the GitHub CLI and Claude Code, installs dependencies, and installs Chromium for the Playwright MCP server. Run `npm start` and open the forwarded port 4200.

To develop locally instead, use Node 24 (`nvm use`), then `npm ci`.

## AI-assisted development (Claude Code)

- `CLAUDE.md` — project context plus the [official Angular AI guidelines](https://angular.dev/ai/develop-with-ai)
- `.mcp.json` — [Angular CLI MCP server](https://angular.dev/ai/mcp) (docs search, best practices, build/test targets) and Playwright MCP (browser testing)
- `.claude/hooks/` — block edits to `.env*`/lock files; auto-format with Prettier
- `/new-component` skill — scaffold components/services via `ng generate` with project conventions
- `ui-reviewer` subagent — accessibility (WCAG AA) and Angular template review

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
