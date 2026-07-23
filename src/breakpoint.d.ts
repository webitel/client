// Pulls in ui-sdk's `ComponentCustomProperties.$breakpoint` augmentation, which
// ships with the breakpoint plugin. The app installs the plugin via a plain-JS
// bridge (src/app/plugins/breakpoint.js) that TS does not follow for types, so
// this side-effect import is what loads the augmentation into the type program.
import '@webitel/ui-sdk/src/plugins/breakpoint/breakpoint.plugin';
