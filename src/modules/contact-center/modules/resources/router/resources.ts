import { PermissionsTab } from '@webitel/ui-datalist/permissions-page';
import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import ResourcesRouteNames from './_internals/ResourcesRouteNames.enum';

const TheResources = () => import('../components/the-resources.vue');
const OpenedResource = () => import('../components/opened-resource.vue');
const General = () => import('../components/opened-resource-general.vue');
const Failure = () => import('../components/opened-resource-failure.vue');
const Numbers = () =>
	import('../modules/numbers/components/opened-resource-numbers.vue');

const ResourcesRoutes = [
	{
		path: '/contact-center/resources',
		name: RouteNames.RESOURCES,
		component: TheResources,
		meta: {
			WtObject: WtObject.Resource,
			UiSection: AdminSections.Resources,
		},
	},
	{
		path: '/contact-center/resources/:id',
		name: `${RouteNames.RESOURCES}-card`,
		redirect: {
			name: ResourcesRouteNames.GENERAL,
		},
		component: OpenedResource,
		meta: {
			WtObject: WtObject.Resource,
			UiSection: AdminSections.Resources,
		},
		children: [
			{
				path: 'general',
				name: ResourcesRouteNames.GENERAL,
				component: General,
			},
			{
				path: 'numbers/:numberId?',
				name: ResourcesRouteNames.NUMBERS,
				component: Numbers,
			},
			{
				path: 'failure',
				name: ResourcesRouteNames.FAILURE,
				component: Failure,
			},
			{
				path: 'permissions/:permissionId?',
				name: ResourcesRouteNames.PERMISSIONS,
				component: PermissionsTab,
			},
		],
	},
];

export default ResourcesRoutes;
