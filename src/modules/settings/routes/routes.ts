import RouteNames from '../../../app/router/_internals/RouteNames.enum.js';
import SettingsRouteNames from './_internals/SettingsRouteNames.enum.js';

const Settings = () => import('../components/the-settings.vue');
const GeneralSettings = () => import('../components/general-settings.vue');
const NotificationSettings = () =>
	import('../components/notification-settings.vue');

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
			requiresAccess: false,
		},
		children: [
			{
				path: 'general',
				name: SettingsRouteNames.GENERAL,
				component: GeneralSettings,
			},
			{
				path: 'notifications',
				name: SettingsRouteNames.NOTIFICATIONS,
				component: NotificationSettings,
			},
		],
	},
];

export default SettingsRoutes;
