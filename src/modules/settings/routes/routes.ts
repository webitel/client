import type { RouteRecordRaw } from 'vue-router';
import { RouteNames } from '../../../app/router/_internals/RouteNames.enum';
import SettingsRouteNames from './_internals/SettingsRouteNames.enum';

const Settings = () => import('../components/the-settings.vue');
const SettingsGeneral = () =>
	import('../modules/general/components/settings-general.vue');
const SettingsNotifications = () =>
	import('../modules/notifications/components/settings-notifications.vue');

const SettingsRoutes: RouteRecordRaw[] = [
	{
		path: '/settings',
		name: RouteNames.SettingsPage,
		component: Settings,
		redirect: {
			name: SettingsRouteNames.GENERAL,
		},
		meta: {
			// prevent beforeEnter: checkAppAccess on parent route [WTEL-4321]
			alwaysAllowed: true,
			// [Claude] hide admin navigation menu in header [WTEL-10954]
			hideNavigationBar: true,
		},
		children: [
			{
				path: 'general',
				name: SettingsRouteNames.GENERAL,
				component: SettingsGeneral,
			},
			{
				path: 'notifications',
				name: SettingsRouteNames.NOTIFICATIONS,
				component: SettingsNotifications,
			},
		],
	},
];

export default SettingsRoutes;
