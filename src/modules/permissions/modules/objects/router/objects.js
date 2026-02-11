import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import ObjectsRouteNames from './_internals/ObjectsRouteNames.enum.js';

const TheObjectsPermissions = () =>
	import('../components/the-objects-permissions.vue');
const OpenedObjectPermissions = () =>
	import('../components/opened-object-permissions.vue');

const Obac = () =>
	import('../modules/obac/components/opened-object-permissions-obac.vue');
const Rbac = () =>
	import('../modules/rbac/components/opened-object-permissions-rbac.vue');

const ObjectsRoutes = [
	{
		path: '/permissions/objects',
		name: RouteNames.OBJECTS,
		component: TheObjectsPermissions,
		meta: {
			WtObject: WtObject.Object,
			UiSection: AdminSections.Objects,
		},
	},
	{
		path: '/permissions/objects/:id',
		name: `${RouteNames.OBJECTS}-card`,
		redirect: {
			name: ObjectsRouteNames.OBAC,
		},
		component: OpenedObjectPermissions,
		meta: {
			WtObject: WtObject.Object,
			UiSection: AdminSections.Objects,
		},
		children: [
			{
				path: 'obac/:permissionId?',
				name: ObjectsRouteNames.OBAC,
				component: Obac,
			},
			{
				path: 'rbac/:permissionId?',
				name: ObjectsRouteNames.RBAC,
				component: Rbac,
			},
		],
	},
];

export default ObjectsRoutes;
