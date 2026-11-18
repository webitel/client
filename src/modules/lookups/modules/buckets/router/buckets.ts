import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';
import type { RouteRecordRaw } from 'vue-router';

import { RouteNames } from '../../../../../app/router/_internals/RouteNames.enum';
import BucketsRouteNamesEnum from './_internals/BucketsRouteNames.enum';

const Buckets = () => import('../components/the-buckets.vue');
const OpenedBucket = () => import('../components/opened-bucket.vue');

const OpenedBucketGeneral = () =>
	import('../components/opened-bucket-general.vue');

const BucketsRoutes: RouteRecordRaw[] = [
	{
		path: '/lookups/buckets',
		name: RouteNames.Buckets,
		component: Buckets,
		meta: {
			WtObject: WtObject.Bucket,
			UiSection: AdminSections.Buckets,
		},
	},
	{
		path: '/lookups/buckets/:id',
		name: `${RouteNames.Buckets}-card`,
		redirect: {
			name: BucketsRouteNamesEnum.GENERAL,
		},
		component: OpenedBucket,
		meta: {
			WtObject: WtObject.Bucket,
			UiSection: AdminSections.Buckets,
		},
		children: [
			{
				path: 'general',
				name: BucketsRouteNamesEnum.GENERAL,
				component: OpenedBucketGeneral,
			},
		],
	},
];
export default BucketsRoutes;
