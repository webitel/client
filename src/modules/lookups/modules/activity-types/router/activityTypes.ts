import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';
import type { RouteRecordRaw } from 'vue-router';

import { RouteNames } from '../../../../../app/router/_internals/RouteNames.enum';
import ActivityTypeRouteNames from './_internals/ActivityTypeRouteNames.enum';

const ActivityTypes = () => import('../components/the-activity-types.vue');
const OpenedActivityType = () =>
	import('../components/opened-activity-type.vue');
const General = () => import('../components/opened-activity-type-general.vue');

const ActivityTypeRoutes: RouteRecordRaw[] = [
	{
		path: '/lookups/activity-types',
		name: RouteNames.ActivityTypes,
		component: ActivityTypes,
		meta: {
			WtObject: WtObject.ActivityType,
			UiSection: AdminSections.ActivityTypes,
		},
	},
	{
		path: '/lookups/activity-types/:id',
		name: `${RouteNames.ActivityTypes}-card`,
		redirect: {
			name: ActivityTypeRouteNames.GENERAL,
		},
		component: OpenedActivityType,
		meta: {
			WtObject: WtObject.ActivityType,
			UiSection: AdminSections.ActivityTypes,
		},
		children: [
			{
				path: 'general',
				name: ActivityTypeRouteNames.GENERAL,
				component: General,
			},
		],
	},
];
export default ActivityTypeRoutes;
