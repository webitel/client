import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';
import type { RouteRecordRaw } from 'vue-router';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const Media = () => import('../components/the-media.vue');

const MediaRoutes: RouteRecordRaw[] = [
	{
		path: '/lookups/media/:mediaId?',
		name: RouteNames.MEDIA,
		component: Media,
		meta: {
			WtObject: WtObject.Media,
			UiSection: AdminSections.Media,
		},
	},
];

export default MediaRoutes;
