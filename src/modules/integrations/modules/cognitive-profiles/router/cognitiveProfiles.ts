import { PermissionsTab } from '@webitel/ui-datalist/permissions';
import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';
import type { RouteRecordRaw } from 'vue-router';

import { RouteNames } from '../../../../../app/router/_internals/RouteNames.enum';
import CognitiveProfilesRouteNames from './_internals/CognitiveProfilesRouteNames.enum';

const TheCognitiveProfiles = () =>
	import('../components/the-cognitive-profiles.vue');
const OpenedCognitiveProfile = () =>
	import('../components/opened-cognitive-profile.vue');
const General = () =>
	import('../components/opened-cognitive-profile-general.vue');

const CognitiveProfilesRoutes: RouteRecordRaw[] = [
	{
		path: '/integrations/cognitive-profiles',
		name: RouteNames.CognitiveProfiles,
		component: TheCognitiveProfiles,
		meta: {
			WtObject: WtObject.CognitiveProfile,
			UiSection: AdminSections.CognitiveProfiles,
		},
	},
	{
		path: '/integrations/cognitive-profiles/:id',
		name: `${RouteNames.CognitiveProfiles}-card`,
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
