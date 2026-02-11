import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import StorageRouteNames from './_internals/StorageRouteNames.enum.js';

const Storage = () => import('../components/the-storage.vue');
const OpenedStorage = () => import('../components/opened-storage.vue');
const Backblaze = () =>
	import('../components/_unused/opened-storage-backblaze.vue');
const Drive = () => import('../components/_unused/opened-storage-drive.vue');
const Dropbox = () =>
	import('../components/_unused/opened-storage-dropbox.vue');
const Local = () => import('../components/_unused/opened-storage-local.vue');
const General = () => import('../components/opened-storage-general.vue');
const S3 = () => import('../components/opened-storage-s3.vue');

const StorageRoutes = [
	{
		path: '/integrations/storage',
		name: RouteNames.STORAGE,
		component: Storage,
		meta: {
			WtObject: WtObject.Storage,
			UiSection: AdminSections.Storage,
		},
	},
	{
		path: '/integrations/storage/:type/:id',
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
			{
				path: 'configurations',
				name: StorageRouteNames.BACKBLAZE,
				component: Backblaze,
			},
			{
				path: 'configurations',
				name: StorageRouteNames.DROPBOX,
				component: Dropbox,
			},
			{
				path: 'configurations',
				name: StorageRouteNames.DRIVE,
				component: Drive,
			},
			{
				path: 'configurations',
				name: StorageRouteNames.LOCAL,
				component: Local,
			},
		],
	},
];

export default StorageRoutes;
