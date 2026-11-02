import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import StorageRouteNames from './_internals/StorageRouteNames.enum';

const TheStorage = () => import('../components/the-storage.vue');
const OpenedStorage = () => import('../components/opened-storage.vue');
const General = () => import('../components/opened-storage-general.vue');
const S3 = () => import('../components/opened-storage-s3.vue');

const StorageRoutes = [
	{
		path: '/integrations/storage',
		name: RouteNames.STORAGE,
		component: TheStorage,
		meta: {
			WtObject: WtObject.Storage,
			UiSection: AdminSections.Storage,
		},
	},
	{
		path: '/integrations/storage/:id',
		name: `${RouteNames.STORAGE}-card`,
		redirect: {
			name: StorageRouteNames.GENERAL,
		},
		component: OpenedStorage,
		meta: {
			WtObject: WtObject.Storage,
			UiSection: AdminSections.Storage,
		},
		children: [
			{
				path: 'general',
				name: StorageRouteNames.GENERAL,
				component: General,
			},
			{
				path: 'configurations',
				name: StorageRouteNames.S3,
				component: S3,
			},
		],
	},
];

export default StorageRoutes;
