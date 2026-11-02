import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import EmailProfilesRouteNames from './_internals/EmailProfilesRouteNames.enum';

const TheEmailProfiles = () => import('../components/the-email-profiles.vue');
const OpenedEmailProfile = () =>
	import('../components/opened-email-profile.vue');

const General = () => import('../components/opened-email-profile-general.vue');

const EmailProfilesRoutes = [
	{
		path: '/integrations/email-profiles',
		name: RouteNames.EMAIL_PROFILES,
		component: TheEmailProfiles,
		meta: {
			WtObject: WtObject.EmailProfile,
			UiSection: AdminSections.EmailProfiles,
		},
	},
	{
		path: '/integrations/email-profiles/:id',
		name: `${RouteNames.EMAIL_PROFILES}-card`,
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
