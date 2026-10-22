---
title: "opened-user-tokens.vue: put empty-value handling into formatDate"
author: Roman
date: 2026-10-22
standing: true
id: l-8212a548
scope: repo
status: active
touches:
  - src/modules/directory/modules/users/modules/tokens/components/opened-user-tokens.vue
  - "src/modules/directory/modules/users/modules/tokens/components/opened-user-tokens.vue#formatDateTime"
---

## Decided
In `opened-user-tokens.vue`, don't wrap `formatDate(+value, FormatDateMode.DATETIME)` in a local helper that only adds a `value ? ... : ''` check. The same guard appears in several places, so it belongs in `formatDate` itself.
Example: in PR #1540, the local `formatDateTime` helper with the empty-value check was flagged as a repeated pattern that should live in `formatDate`.

_From review on #1540 here, merged Sep 30._
