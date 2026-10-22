---
title: "one-plus-many-table-cell.vue: reuse the ui-sdk component, else use composition A"
author: Roman
date: 2026-10-22
standing: true
id: l-bbc71ec8
scope: repo
status: active
touches:
  - src/app/components/utils/table-cell/one-plus-many-table-cell/one-plus-many-table-cell.vue
---

## Decided
Before keeping or extending `src/app/components/utils/table-cell/one-plus-many-table-cell/one-plus-many-table-cell.vue`, check whether `@webitel/ui-sdk` already has an equivalent "one plus many" cell. History and CRM use the same pattern. If a local component is still needed, write it with the composition API (`<script setup>`), not the options API.
Example: in PR #1455, the reviewer asked if the lib had this component and asked for a composition rewrite of the local one.

_From review on #1455 here, merged Oct 5._
