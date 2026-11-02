import { PermissionsTab } from '@webitel/ui-datalist/permissions-page';
import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import CognitiveProfilesRouteNames from './_internals/CognitiveProfilesRouteNames.enum';

const TheCognitiveProfiles = () =>
	import('../components/the-cognitive-profiles.vue');
const OpenedCognitiveProfile = () =>
	import('../components/opened-cognitive-profile.vue');
const General = () =>
	import('../components/opened-cognitive-profile-general.vue');

const CognitiveProfilesRoutes = [
	{
		path: '/integrations/cognitive-profiles',
		name: RouteNames.COGNITIVE_PROFILES,
		component: TheCognitiveProfiles,
		meta: {
			WtObject: WtObject.CognitiveProfile,
			UiSection: AdminSections.CognitiveProfiles,
		},
	},
	{
		path: '/integrations/cognitive-profiles/:id',
		name: `${RouteNames.COGNITIVE_PROFILES}-card`,
		redirect: {
			name: CognitiveProfilesRouteNames.GENERAL,
		},
		component: OpenedCognitiveProfile,
		meta: {
			WtObject: WtObject.CognitiveProfile,
			UiSection: AdminSections.CognitiveProfiles,
		},
		children: [
			{
				path: 'general',
				name: CognitiveProfilesRouteNames.GENERAL,
				component: General,
			},
			{
				path: 'permissions/:permissionId?',
				name: CognitiveProfilesRouteNames.PERMISSIONS,
				component: PermissionsTab,
			},
		],
	},
];

export default CognitiveProfilesRoutes;
