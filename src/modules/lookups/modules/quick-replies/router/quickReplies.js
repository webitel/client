import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import QuickRepliesRouteNamesEnum from './_internals/QuickRepliesRouteNames.enum.js';

const QuickReplies = () => import('../components/the-quick-replies.vue');
const OpenedQuickReply = () => import('../components/opened-quick-reply.vue');

const OpenedQuickReplyGeneral = () =>
	import('../components/opened-quick-reply-general.vue');

const QuickRepliesRoutes = [
	{
		path: '/lookups/quick-replies',
		name: RouteNames.QUICK_REPLIES,
		component: QuickReplies,
		meta: {
			WtObject: WtObject.QuickReply,
			UiSection: AdminSections.QuickReplies,
		},
	},
	{
		path: '/lookups/quick-replies/:id',
		name: `${RouteNames.QUICK_REPLIES}-card`,
		redirect: {
			name: QuickRepliesRouteNamesEnum.GENERAL,
		},
		component: OpenedQuickReply,
		meta: {
			WtObject: WtObject.QuickReply,
			UiSection: AdminSections.QuickReplies,
		},
		children: [
			{
				path: 'general',
				name: QuickRepliesRouteNamesEnum.GENERAL,
				component: OpenedQuickReplyGeneral,
			},
		],
	},
];
export default QuickRepliesRoutes;
