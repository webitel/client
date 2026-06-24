# Cloud Code Context (Web Client Auth)

Этот файл объединяет доступные в текущем проекте правила и подключенные skills, чтобы их можно было использовать как единый контекст для Cloud Code.

## 1) Always Applied Rules

### Rule: `project-conventions.mdc`
Path: `/Users/lera/Documents/Webitel/projects/.cursor/rules/project-conventions.mdc`

- Vue components: `kebab-case.vue`; layout shell → `the-`, open card → `opened-`, SDK design system → `wt-`
- Composables: one folder per hook — `composables/useXxx/useXxx.ts` (folder = file = exported function)
- Pinia stores: `stores/useXxxStore.ts`, export named `useXxxStore`
- Shared types/interfaces: colocate next to what they describe; or `types/` if shared across the module
- Tests: `__tests__/useXxx.spec.ts` or `ComponentName.spec.ts` next to the source file

Module structure:

```text
src/modules/<domain>/
  components/
  composables/
  stores/
  router/
  api/        <- only if not Orval-generated
  types/
  index.ts    <- public re-export for the module
```

- Booleans: `is`, `has`, `can`, `should` prefix
- Event handlers: `handle*`
- Async functions: action verb (`fetch*`, `load*`, `save*`, `delete*`)
- Never add new npm packages without team discussion
- Use `lodash-es` instead of `lodash`
- No deep `src/` imports from `@webitel/ui-sdk`; use public entry points only
- Vitest: `globals: true`, no manual imports of `describe`/`it`/`expect`
- Mock API via `vi.mock('@webitel/api-services/api')`
- Every composable and store must have at least a basic unit test
- i18n keys in hierarchical `snake_case`
- Add new i18n keys to all locales
- No hardcoded strings in templates; use `$t('...')` / `t('...')`

### Rule: `git-branch-and-commit-global.mdc`
Path: `/Users/lera/.cursor/rules/git-branch-and-commit-global.mdc`

- Branch format: `<type>/<TICKET>/<short-description>`
- Allowed `type`: `feature`, `fix`, `bugfix`, `hotfix`, `refactor`, `chore`, `docs`, `test`
- Ticket format: upper-case Jira key, e.g. `WTEL-9177`
- Short description: 2-6 words in kebab-case

Commit message format:

```text
<type>: <short description>[WTEL-XXXX](https://webitel.atlassian.net/browse/WTEL-XXXX)
```

- Recommended commit types: `fix`, `feat`, `refactor`, `chore`, `docs`, `test`
- Message should be short, imperative style
- Include Jira ticket in `[]` and Jira link in `()`

Commit comment format for publishing:

```text
@Lera24
fix: conflict[WTEL-9177](https://webitel.atlassian.net/browse/WTEL-9177)
```

## 2) Requestable Rules

### Rule: `architecture.mdc`
Path: `/Users/lera/Documents/Webitel/projects/.cursor/rules/architecture.mdc`

Key points:

- UI state for one component -> local `ref`/`reactive`
- Shared state (2+ components) -> Pinia store
- Reusable stateless logic -> composable
- HTTP requests -> `@webitel/api-services` or hand-written API module
- Global session/config used across apps -> SDK factory store (`createXxxStore`)
- Logic reused in 2+ apps -> `webitel-ui-sdk`
- New state management -> Pinia only
- Do not edit generated files in `gen/`
- `setApiServicesConfig({ eventBus })` should be called once in `main.ts`
- Forbidden patterns:
    - circular store dependencies
    - store imports component
    - direct store state mutation from component (use actions/setters)
    - business logic in `router/`
    - API calls directly in template handlers
    - copying SDK code into app

### Rule: `code-review.mdc`
Path: `/Users/lera/Documents/Webitel/projects/.cursor/rules/code-review.mdc`

Key points:

- Vue SFC: always `<script setup lang="ts">`
- Props via `defineProps<Interface>()` + `withDefaults`
- Typed emits via `defineEmits<Interface>()`
- Prefer Composition API and extract repeated logic into composables
- Prefer `computed` over `watch`
- Explicit typing for parameters and async return types
- Avoid `any` unless justified
- No unexplained `@ts-ignore` / `@ts-expect-error`
- Import order: external, blank line, relative
- No deep imports from SDK internals
- Pinia composition-style stores with explicit return object
- Composable layout: `composables/useXxx/useXxx.ts`
- Hand-written API modules: `getDefaultInstance()` + transforms + `notify` in catch
- Formatting: tabs, single quotes, multiline attributes, expanded objects/arrays
- Red flags: `console.log` in production, prop mutation, unsafe `v-html`, mixed Vuex/Pinia same domain
- Prioritize maintainability, readability, low hidden side effects

## 3) Available Skills

Each skill is available at runtime and can be read on demand.

- `/Users/lera/.cursor/skills-cursor/automate/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/babysit/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/canvas/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/create-hook/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/create-rule/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/create-skill/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/loop/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/review-bugbot/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/review-security/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/sdk/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/split-to-prs/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/statusline/SKILL.md`
- `/Users/lera/.cursor/skills-cursor/update-cursor-settings/SKILL.md`
- `/Users/lera/.agents/skills/cavecrew/SKILL.md`
- `/Users/lera/.agents/skills/caveman-commit/SKILL.md`
- `/Users/lera/.agents/skills/caveman-compress/SKILL.md`
- `/Users/lera/.agents/skills/caveman-help/SKILL.md`
- `/Users/lera/.agents/skills/caveman-review/SKILL.md`
- `/Users/lera/.agents/skills/caveman-stats/SKILL.md`
- `/Users/lera/.agents/skills/caveman/SKILL.md`

## 4) Suggested Use in Cloud Code

1. Load this file first.
2. Treat section "Always Applied Rules" as strict defaults.
3. Use "Requestable Rules" for design/refactor/review tasks.
4. Load skill files only when task matches the skill trigger.

## 5) Scope Note

Этот файл содержит проектные правила и список доступных skills. Внутренние системные инструкции платформы сюда не включаются.
