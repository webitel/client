import { WtApplication } from '@webitel/ui-sdk/enums';
import { computed, inject } from 'vue';

import { useUserinfoStore } from '../../modules/userinfo/stores/userinfoStore';

export interface AvailableApp {
	name: WtApplication;
	href: string;
}

// [Claude] Meet has no app url, so it never shows up here
const appUrls: Partial<Record<WtApplication, string>> = {
	[WtApplication.Agent]: import.meta.env.VITE_AGENT_URL,
	[WtApplication.Supervisor]: import.meta.env.VITE_SUPERVISOR_URL,
	[WtApplication.History]: import.meta.env.VITE_HISTORY_URL,
	[WtApplication.Audit]: import.meta.env.VITE_AUDIT_URL,
	[WtApplication.Admin]: import.meta.env.VITE_ADMIN_URL,
	[WtApplication.Analytics]: import.meta.env.VITE_GRAFANA_URL,
	[WtApplication.Crm]: import.meta.env.VITE_CRM_URL,
	[WtApplication.Wfm]: import.meta.env.VITE_WFM_URL,
};

/**
 * [Claude] The apps the user can open, in the given order: Analytics (Grafana)
 * only exists on-site, the rest are filtered by the user's app visibility.
 */
export const useAvailableApps = (order: WtApplication[]) => {
	const config = inject<{
		ON_SITE?: boolean;
	}>('$config');

	const { hasApplicationVisibility } = useUserinfoStore();

	return computed<AvailableApp[]>(() =>
		order
			.filter((name) => name !== WtApplication.Analytics || config?.ON_SITE)
			.filter((name) => hasApplicationVisibility(name))
			.map((name) => ({
				name,
				href: appUrls[name] ?? '',
			})),
	);
};
