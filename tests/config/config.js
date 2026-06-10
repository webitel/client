import { config } from '@vue/test-utils';
import { vi } from 'vitest';
import { createI18n } from 'vue-i18n';
import { createRouter, createWebHistory } from 'vue-router';
import en from '../../src/app/locale/en/en';

// Components call useUserAccessControl() in setup(); the real composable is only
// created at app bootstrap, so stub it globally with all-access for every test.
vi.mock('@/app/composables/useUserAccessControl', async () => {
	const { ref } = await import('vue');
	const useUserAccessControl = () => ({
		hasReadAccess: ref(true),
		hasCreateAccess: ref(true),
		hasUpdateAccess: ref(true),
		hasDeleteAccess: ref(true),
		hasSaveActionAccess: ref(true),
		disableUserInput: ref(false),
	});
	return {
		useUserAccessControl,
		createUserAccessControl: () => useUserAccessControl,
	};
});

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'vi',
		},
	],
});

// Real i18n instance so both Options API ($t) and Composition API (useI18n)
// work in mounted components. legacy: false enables useI18n; globalInjection
// keeps $t available in templates. Missing-key warnings are silenced since
// tests render against the full locale tree, not a curated subset.
const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: 'en',
	messages: {
		en,
	},
	missingWarn: false,
	fallbackWarn: false,
});

config.global.plugins.push(router);
config.global.plugins.push(i18n);
