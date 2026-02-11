import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import ChatplanRouteNames from './_internals/ChatplanRouteNames.enum.js';

const Chatplan = () => import('../components/the-chatplan.vue');
const OpenedChatplan = () => import('../components/opened-chatplan.vue');
const OpenedChatplanGeneral = () =>
	import('../components/opened-chatplan-general.vue');

const ChatplanRoutes = [
	{
		path: '/routing/chatplan',
		name: RouteNames.CHATPLAN,
		component: Chatplan,
		meta: {
			WtObject: WtObject.Chatplan,
			UiSection: AdminSections.Chatplan,
		},
	},
	{
		path: '/routing/chatplan/:id',
		name: `${RouteNames.CHATPLAN}-card`,
		redirect: {
			name: ChatplanRouteNames.GENERAL,
		},
		component: OpenedChatplan,
		meta: {
			WtObject: WtObject.Chatplan,
			UiSection: AdminSections.Chatplan,
		},
		children: [
			{
				path: 'general',
				name: ChatplanRouteNames.GENERAL,
				component: OpenedChatplanGeneral,
			},
		],
	},
];
export default ChatplanRoutes;
