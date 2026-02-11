import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import ChatGatewayRouteNames from './_internals/ChatGatewayRouteNames.enum.js';

const ChatGateways = () => import('../components/the-chat-gateways.vue');
const OpenedChatGateways = () =>
	import('../components/opened-chat-gateway.vue');
const OpenedChatGatewayTelegramBotGeneralTab = () =>
	import(
		'../components/telegram-bot/opened-chat-gateway-telegram-bot-general-tab.vue'
	);
const OpenedChatGatewayTelegramAppGeneralTab = () =>
	import(
		'../components/telegram-app/opened-chat-gateway-telegram-app-general-tab.vue'
	);
const OpenedChatGatewayTemplatesTab = () =>
	import('../components/_shared/opened-chat-gateway-templates-tab.vue');
const OpenedChatGatewayMessengerGeneralTab = () =>
	import(
		'../components/messenger/opened-chat-gateway-messenger-general-tab.vue'
	);
const OpenedChatFacebook = () =>
	import('../modules/messenger/facebook/components/facebook-tab.vue');
const OpenedChatInstagram = () =>
	import('../modules/messenger/instagram/components/instagram-tab.vue');
const OpenedChatWhatsapp = () =>
	import('../modules/messenger/whatsapp/components/whatsapp-tab.vue');
const OpenedChatGatewayInfobipGeneralTab = () =>
	import('../components/infobip/opened-chat-gateway-infobip-general-tab.vue');
const OpenedChatGatewayViberGeneralTab = () =>
	import('../components/viber/opened-chat-gateway-viber-general-tab.vue');
const OpenedChatGatewayWebchatGeneralTab = () =>
	import(
		'../modules/webchat/components/opened-chat-gateway-webchat-general-tab.vue'
	);
const OpenedChatGatewayWebchatViewTab = () =>
	import(
		'../modules/webchat/components/opened-chat-gateway-webchat-view-tab.vue'
	);
const OpenedChatGatewayWebchatAlternativeChannelsTab = () =>
	import(
		'../modules/webchat/components/opened-chat-gateway-webchat-alternative-channels-tab.vue'
	);
const OpenedChatGatewayWebchatChatTab = () =>
	import(
		'../modules/webchat/components/opened-chat-gateway-webchat-chat-tab.vue'
	);
const OpenedChatGatewayWebchatAppointmentTab = () =>
	import(
		'../modules/webchat/components/opened-chat-gateway-webchat-appointment-tab.vue'
	);
const OpenedChatGatewayWebchatRecaptchaTab = () =>
	import(
		'../modules/webchat/components/opened-chat-gateway-webchat-recaptcha-tab.vue'
	);
const OpenedChatGatewayCustomGeneralTab = () =>
	import('../components/custom/opened-chat-gateway-custom-general-tab.vue');
const OpenedChatGatewayViberStyleTab = () =>
	import('../components/viber/opened-chat-gateway-viber-style-tab.vue');

const ChatGetewaysRoutes = [
	{
		path: '/routing/chat-gateways',
		name: RouteNames.CHAT_GATEWAYS,
		component: ChatGateways,
		meta: {
			WtObject: WtObject.ChatGateway,
			UiSection: AdminSections.ChatGateways,
		},
	},
	{
		path: '/routing/chat-gateways/:id',
		name: `${RouteNames.CHAT_GATEWAYS}-card`,
		redirect: {
			name: ChatGatewayRouteNames.GENERAL,
		},
		component: OpenedChatGateways,
		meta: {
			WtObject: WtObject.ChatGateway,
			UiSection: AdminSections.ChatGateways,
		},
		children: [
			{
				path: 'telegram-bot',
				name: ChatGatewayRouteNames.GENERAL,
				component: OpenedChatGatewayTelegramBotGeneralTab,
			},
			{
				path: 'telegram-app',
				name: ChatGatewayRouteNames.GENERAL,
				component: OpenedChatGatewayTelegramAppGeneralTab,
			},
			{
				path: 'infobip',
				name: ChatGatewayRouteNames.GENERAL,
				component: OpenedChatGatewayInfobipGeneralTab,
			},
			{
				path: 'meta',
				name: ChatGatewayRouteNames.GENERAL,
				component: OpenedChatGatewayMessengerGeneralTab,
			},
			{
				path: 'facebook-pages',
				name: ChatGatewayRouteNames.FACEBOOK_PAGES,
				component: OpenedChatFacebook,
			},
			{
				path: 'instagram',
				name: ChatGatewayRouteNames.INSTAGRAM,
				component: OpenedChatInstagram,
			},
			{
				path: 'whatsapp',
				name: ChatGatewayRouteNames.WHATSAPP,
				component: OpenedChatWhatsapp,
			},
			{
				path: 'viber',
				name: ChatGatewayRouteNames.GENERAL,
				component: OpenedChatGatewayViberGeneralTab,
			},
			{
				path: 'general',
				name: ChatGatewayRouteNames.GENERAL,
				component: OpenedChatGatewayWebchatGeneralTab,
			},
			{
				path: 'view',
				name: ChatGatewayRouteNames.VIEW,
				component: OpenedChatGatewayWebchatViewTab,
			},
			{
				path: 'chat',
				name: ChatGatewayRouteNames.CHAT,
				component: OpenedChatGatewayWebchatChatTab,
			},
			{
				path: 'appointment',
				name: ChatGatewayRouteNames.APPOINTMENT,
				component: OpenedChatGatewayWebchatAppointmentTab,
			},
			{
				path: 'alternative-channels',
				name: ChatGatewayRouteNames.ALTERNATIVE_CHANNELS,
				component: OpenedChatGatewayWebchatAlternativeChannelsTab,
			},
			{
				path: 'recapcha',
				name: ChatGatewayRouteNames.RE_CAPTCHA,
				component: OpenedChatGatewayWebchatRecaptchaTab,
			},
			{
				path: 'general',
				name: ChatGatewayRouteNames.GENERAL,
				component: OpenedChatGatewayCustomGeneralTab,
			},
			{
				path: 'templates',
				name: ChatGatewayRouteNames.TEMPLATES,
				component: OpenedChatGatewayTemplatesTab,
			},
			{
				path: 'style',
				name: ChatGatewayRouteNames.STYLE,
				component: OpenedChatGatewayViberStyleTab,
			},
		],
	},
];
export default ChatGetewaysRoutes;
