---
title: "queue members stores and headers: no explanatory comments; store naming"
author: Roman
date: 2026-10-22
standing: true
id: l-bf113683
scope: repo
status: active
touches:
  - src/modules/contact-center/modules/queues/modules/members/components/the-queue-members.vue
  - src/modules/contact-center/modules/queues/modules/members/stores/datalist/_internals/headers.ts
---

## Decided
In the queue members module (`headers.ts`, `communicationsHeaders.ts`, `the-queue-members.vue`, the popup), don't add explanatory or ticket-reference comments such as notes on `show: false`, engine sort keys, or WTEL numbers. The reviewers asked for them to be removed. Name store instances after the store (`queueMemberCommunicationsDatalistStore`), and use plain names like `communications` instead of `destinations` or `communicationsOnPopup`.
Example: in PR #1455, comments in `headers.ts` and `the-queue-members.vue` were deleted on review.

_From review on #1455 here, merged Oct 5._
