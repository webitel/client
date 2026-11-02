import RouteNames from '../../../app/router/_internals/RouteNames.enum.js';
import SettingsRouteNames from './_internals/SettingsRouteNames.enum';

const Settings = () => import('../components/the-settings.vue');
const SettingsGeneral = () =>
	import('../modules/general/components/settings-general.vue');
const SettingsNotifications = () =>
	import('../modules/notifications/components/settings-notifications.vue');

const SettingsRoutes = [
	{
		path: '/settings',
		name: RouteNames.SETTINGS_PAGE,
		component: Settings,
		redirect: {
			name: SettingsRouteNames.GENERAL,
		},
		meta: {
			// prevent beforeEnter: checkAppAccess on parent route [WTEL-4321]
			alwaysAllowed: true,
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
