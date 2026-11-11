import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';
import type { RouteRecordRaw } from 'vue-router';

import { RouteNames } from '../../../../../app/router/_internals/RouteNames.enum';
import EmailProfilesRouteNames from './_internals/EmailProfilesRouteNames.enum';

const TheEmailProfiles = () => import('../components/the-email-profiles.vue');
const OpenedEmailProfile = () =>
	import('../components/opened-email-profile.vue');

const General = () => import('../components/opened-email-profile-general.vue');

const EmailProfilesRoutes: RouteRecordRaw[] = [
	{
		path: '/integrations/email-profiles',
		name: RouteNames.EmailProfiles,
		component: TheEmailProfiles,
		meta: {
			WtObject: WtObject.EmailProfile,
			UiSection: AdminSections.EmailProfiles,
		},
	},
	{
		path: '/integrations/email-profiles/:id',
		name: `${RouteNames.EmailProfiles}-card`,
		redirect: {
			name: EmailProfilesRouteNames.GENERAL,
		},
		component: OpenedEmailProfile,
		meta: {
			WtObject: WtObject.EmailProfile,
			UiSection: AdminSections.EmailProfiles,
		},
		children: [
			{
				path: 'general',
				name: EmailProfilesRouteNames.GENERAL,
				component: General,
			},
		],
	},
];
export default EmailProfilesRoutes;
