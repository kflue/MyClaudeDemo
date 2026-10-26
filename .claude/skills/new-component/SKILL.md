---
name: new-component
description: Scaffold an Angular component, service, directive or pipe with the Angular CLI, following this project's conventions. Usage: /new-component <type> <path/name> [purpose]
disable-model-invocation: true
argument-hint: <component|service|directive|pipe> <path/name> [purpose]
---

Scaffold a new Angular artifact: `$ARGUMENTS`

## Steps

1. Parse the arguments: the type (default `component`), the path/name (e.g. `features/todos/todo-list`), and an optional purpose.
2. Generate it with the CLI — never hand-write the boilerplate:
   - Component: `npx ng generate component src/app/<path/name>`
     - Add `--inline-template --inline-style` if the component is small and presentational.
   - Service: `npx ng generate service src/app/<path/name>`
   - Directive / pipe: `npx ng generate directive|pipe src/app/<path/name>`
3. If the purpose was given, implement it following [CLAUDE.md](../../../CLAUDE.md). In particular:
   - `input()` / `output()` / `model()` functions, not decorators
   - signals + `computed()` for state, native control flow (`@if`, `@for`) in templates
   - no `standalone: true`, no explicit `OnPush` (both are defaults in v22)
   - `inject()` instead of constructor injection; `@Service` for new singleton services
   - host bindings in the `host` object, not `@HostBinding` / `@HostListener`
   - accessible markup (WCAG AA, semantic elements, labels, focus management)
4. If it is a routed feature, add a lazy-loaded route (`loadComponent`) in `src/app/app.routes.ts`.
5. Update the generated `.spec.ts` with at least one meaningful test, then run `npm test -- --watch=false` and fix failures.
6. Report the files created and the selector/route to use.

If unsure about an API, use the `angular-cli` MCP server's `search_documentation` / `get_best_practices` tools.
