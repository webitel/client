import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import UsersRouteNames from './_internals/UsersRouteNames.enum.js';

const PermissionsTab = () =>
	import(
		'@webitel/ui-sdk/src/modules/ObjectPermissions/components/permissions-tab.vue'
	);

const Users = () => import('../components/the-users.vue');
const OpenedUser = () => import('../components/opened-user.vue');
const OpenedUserGeneral = () => import('../components/opened-user-general.vue');
const OpenedUserRoles = () => import('../components/opened-user-roles.vue');
const OpenedUserLicense = () => import('../components/opened-user-license.vue');
const OpenedUserDevices = () => import('../components/opened-user-devices.vue');
const OpenedUserVariables = () =>
	import('../components/opened-user-variables.vue');
const OpenedUserToken = () =>
	import('../modules/tokens/components/opened-user-token.vue');
const OpenedUserLogs = () =>
	import('../modules/logs/components/opened-user-logs.vue');

const UsersRoutes = [
	{
		path: '/directory/users',
		name: RouteNames.USERS,
		component: Users,
		meta: {
			WtObject: WtObject.User,
			UiSection: AdminSections.Users,
		},
	},
	{
		path: '/directory/users/:id',
		name: `${RouteNames.USERS}-card`,
		component: OpenedUser,
		redirect: {
			name: UsersRouteNames.GENERAL,
		},
		meta: {
			WtObject: WtObject.User,
			UiSection: AdminSections.Users,
		},
		children: [
			{
				path: 'general',
				name: UsersRouteNames.GENERAL,
				component: OpenedUserGeneral,
			},
			{
				path: 'roles',
				name: UsersRouteNames.ROLES,
				component: OpenedUserRoles,
			},
			{
				path: 'license',
				name: UsersRouteNames.LICENSE,
				component: OpenedUserLicense,
			},
			{
				path: 'devices',
				name: UsersRouteNames.DEVICES,
				component: OpenedUserDevices,
			},
			{
				path: 'variables',
				name: UsersRouteNames.VARIABLES,
				component: OpenedUserVariables,
			},
			{
				path: 'tokens/:tokenId?',
				name: UsersRouteNames.TOKENS,
				component: OpenedUserToken,
			},
			{
				path: 'logs',
				name: UsersRouteNames.LOGS,
				component: OpenedUserLogs,
			},
			{
				path: 'permissions/:permissionId?',
				name: `${UsersRouteNames.PERMISSIONS}-card`,
				component: PermissionsTab,
			},
		],
	},
];

export default UsersRoutes;
