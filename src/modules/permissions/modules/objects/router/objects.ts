import { PermissionsTab } from '@webitel/ui-datalist/permissions';
import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import ObjectsRouteNames from './_internals/ObjectsRouteNames.enum';

const TheObjects = () => import('../components/the-objects.vue');
const OpenedObject = () => import('../components/opened-object.vue');

const Rbac = () => import('../modules/rbac/components/opened-object-rbac.vue');

const ObjectsRoutes = [
	{
		path: '/permissions/objects',
		name: RouteNames.OBJECTS,
		component: TheObjects,
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
		component: OpenedObject,
		meta: {
			WtObject: WtObject.Object,
			UiSection: AdminSections.Objects,
		},
		children: [
			{
				path: 'obac/:permissionId?',
				name: ObjectsRouteNames.OBAC,
				component: PermissionsTab,
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
