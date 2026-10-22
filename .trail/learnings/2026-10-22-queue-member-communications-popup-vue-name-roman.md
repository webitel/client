---
title: "queue-member-communications-popup.vue: name classes after the component"
author: Roman
date: 2026-10-22
standing: true
id: l-194bdf9f
scope: repo
status: active
touches:
  - src/modules/contact-center/modules/queues/modules/members/components/communications/queue-member-communications-popup.vue
---

## Decided
In the queue members popups, the root block class goes on the popup component itself (`wt-popup`), named after the component, for example `queue-member-communications-popup`. Inner elements use that block name (BEM), not generic names like `communications-popup`. The inner `<section>` is only a wrapper. Classes passed to child components (for example `one-plus-many` in `the-queue-members.vue`) also follow the same naming.
Example: in PR #1455, `communications-popup` was renamed to match the component, and the class moved to the popup.

_From review on #1455 here, merged Oct 5._
