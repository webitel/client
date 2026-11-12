import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';
import type { RouteRecordRaw } from 'vue-router';

import { RouteNames } from '../../../../../app/router/_internals/RouteNames.enum';
import StoragePoliciesRouteNames from './_internals/StoragePoliciesRouteNames.enum';

const StoragePolicies = () => import('../components/the-storage-policies.vue');
const OpenedStoragePolicy = () =>
	import('../components/opened-storage-policy.vue');
const General = () => import('../components/opened-storage-policy-general.vue');

const StoragePoliciesRoutes: RouteRecordRaw[] = [
	{
		path: '/integrations/storage-policies',
		name: RouteNames.StoragePolicies,
		component: StoragePolicies,
		meta: {
			WtObject: WtObject.FilePolicy,
			UiSection: AdminSections.StoragePolicies,
		},
	},
	{
		path: '/integrations/storage-policies/:id',
		name: `${RouteNames.StoragePolicies}-card`,
		redirect: {
			name: StoragePoliciesRouteNames.GENERAL,
		},
		component: OpenedStoragePolicy,
		meta: {
			WtObject: WtObject.FilePolicy,
			UiSection: AdminSections.StoragePolicies,
		},
		children: [
			{
				path: 'general',
				name: StoragePoliciesRouteNames.GENERAL,
				component: General,
			},
		],
	},
];

export default StoragePoliciesRoutes;
