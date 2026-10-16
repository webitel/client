import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import ChatGatewayRouteNames from './_internals/ChatGatewayRouteNames.enum';

const ChatGateways = () => import('../components/the-chat-gateways.vue');
const OpenedChatGateway = () => import('../components/opened-chat-gateway.vue');
const OpenedChatGatewayWebchatGeneral = () =>
	import(
		'../modules/webchat/components/opened-chat-gateway-webchat-general.vue'
	);
const OpenedChatGatewayGeneral = () =>
	import('../components/opened-chat-gateway-general.vue');
const OpenedChatGatewayTemplates = () =>
	import('../components/opened-chat-gateway-templates.vue');
const OpenedChatFacebook = () =>
	import(
		'../modules/messenger/components/opened-chat-gateway-messenger-facebook.vue'
	);
const OpenedChatInstagram = () =>
	import(
		'../modules/messenger/components/opened-chat-gateway-messenger-instagram.vue'
	);
const OpenedChatWhatsapp = () =>
	import(
		'../modules/messenger/components/opened-chat-gateway-messenger-whatsapp.vue'
	);
const OpenedChatGatewayWebchatView = () =>
	import('../modules/webchat/components/opened-chat-gateway-webchat-view.vue');
const OpenedChatGatewayWebchatAlternativeChannels = () =>
	import(
		'../modules/webchat/components/opened-chat-gateway-webchat-alternative-channels.vue'
	);
const OpenedChatGatewayWebchatChat = () =>
	import('../modules/webchat/components/opened-chat-gateway-webchat-chat.vue');
const OpenedChatGatewayWebchatAppointment = () =>
	import(
		'../modules/webchat/components/opened-chat-gateway-webchat-appointment.vue'
	);
const OpenedChatGatewayWebchatRecaptcha = () =>
	import(
		'../modules/webchat/components/opened-chat-gateway-webchat-recaptcha.vue'
	);
const OpenedChatGatewayViberStyle = () =>
	import('../modules/viber/components/opened-chat-gateway-viber-style.vue');

const ChatGatewaysRoutes = [
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
		// [Claude] no redirect: the first tab depends on the provider, so the card opens it once that is known
		component: OpenedChatGateway,
		meta: {
			WtObject: WtObject.ChatGateway,
			UiSection: AdminSections.ChatGateways,
		},
		children: [
			{
				path: 'telegram-bot',
				name: ChatGatewayRouteNames.TELEGRAM_BOT,
				component: OpenedChatGatewayGeneral,
			},
			{
				path: 'telegram-app',
				name: ChatGatewayRouteNames.TELEGRAM_APP,
				component: OpenedChatGatewayGeneral,
			},
			{
				path: 'infobip',
				name: ChatGatewayRouteNames.INFOBIP,
				component: OpenedChatGatewayGeneral,
			},
			{
				path: 'meta',
				name: ChatGatewayRouteNames.META,
				component: OpenedChatGatewayGeneral,
			},
			{
				path: 'viber',
				name: ChatGatewayRouteNames.VIBER,
				component: OpenedChatGatewayGeneral,
			},
			{
				path: 'webchat',
				name: ChatGatewayRouteNames.WEBCHAT,
				component: OpenedChatGatewayWebchatGeneral,
			},
			{
				path: 'custom',
				name: ChatGatewayRouteNames.CUSTOM,
				component: OpenedChatGatewayGeneral,
			},
			{
				path: 'templates',
				name: ChatGatewayRouteNames.TEMPLATES,
				component: OpenedChatGatewayTemplates,
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
				path: 'style',
				name: ChatGatewayRouteNames.STYLE,
				component: OpenedChatGatewayViberStyle,
			},
			{
				path: 'view',
				name: ChatGatewayRouteNames.VIEW,
				component: OpenedChatGatewayWebchatView,
			},
			{
				path: 'chat',
				name: ChatGatewayRouteNames.CHAT,
				component: OpenedChatGatewayWebchatChat,
			},
			{
				path: 'appointment',
				name: ChatGatewayRouteNames.APPOINTMENT,
				component: OpenedChatGatewayWebchatAppointment,
			},
			{
				path: 'alternative-channels',
				name: ChatGatewayRouteNames.ALTERNATIVE_CHANNELS,
				component: OpenedChatGatewayWebchatAlternativeChannels,
			},
			{
				path: 'recapcha',
				name: ChatGatewayRouteNames.RE_CAPTCHA,
				component: OpenedChatGatewayWebchatRecaptcha,
			},
		],
	},
];
export default ChatGatewaysRoutes;
