---
title: "agent-history-popup.vue: look in ui-sdk before writing date-range helpers"
author: Roman
date: 2026-10-22
standing: true
id: l-69c10946
scope: repo
status: active
touches:
  - src/modules/contact-center/modules/agents/components/agent-history-popup.vue
  - "src/modules/contact-center/modules/agents/components/agent-history-popup.vue#todaysRange"
---

## Decided
Do not hand-write date helpers such as `todaysRange` (from `startOfToday`/`endOfToday`) in `agent-history-popup.vue`. The shared `@webitel/ui-sdk` probably has something like it, so look there first and reuse it.
Example: in PR #1547, the reviewer said the lib should already have a helper like the local `todaysRange`.

_From review on #1547 here, merged Oct 2._
