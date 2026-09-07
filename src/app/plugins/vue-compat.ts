import * as vue from 'vue';

type CompatConfig = Record<string, boolean | 'suppress-warning'>;

/**
 * `configureCompat` ships only with `@vue/compat`, which vite aliases in place
 * of `vue` (see `resolve.alias` in vite.config.ts). The `vue` type package
 * knows nothing about it, hence the cast.
 */
const { configureCompat } = vue as unknown as {
	configureCompat: (config: CompatConfig) => void;
};

/**
 * Compat features this codebase has already migrated past.
 *
 * `INSTANCE_LISTENERS` keeps vue 2's split between `$attrs` and `$listeners`:
 * while it is on, `shouldSkipAttr()` drops every `on*` key from `$attrs`, so a
 * component that re-binds `v-bind="$attrs"` onto an inner element passes the
 * parent's props along but silently loses its listeners.
 *
 * `@webitel/ui-sdk` is written for vue 3, where that binding carries both.
 * `wt-input-text` relies on it, so with the compat default every listener a
 * consumer puts on a `wt-input-text` disappeared — including the
 * `@keydown.enter` that `wt-multi-select` uses to commit a custom value, which
 * is why no tag could be added to a queue (WTEL-10293).
 *
 * Nothing reads `$listeners` any more, so the vue 3 behaviour is what we want.
 */
export const configureVueCompat = () =>
	configureCompat({
		INSTANCE_LISTENERS: false,
	});
