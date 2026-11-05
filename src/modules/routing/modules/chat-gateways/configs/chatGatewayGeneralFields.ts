import { ChatGatewayProvider } from '@webitel/api-services/enums';

/** [Claude] one `metadata` field of a provider's general form */
export interface ChatGatewayGeneralField {
	prop: string;
	/** [Claude] i18n key, with a plural count where the key has forms */
	label:
		| string
		| [
				string,
				number,
		  ];
	required?: boolean;
	/** [Claude] i18n key of the label hint */
	hint?: string;
	/**
	 * [Claude] `generate`: a secret the user may generate instead of typing;
	 * `flow`, `uri`: the gateway's flow select and webhook uri, placed where they stand in the list
	 */
	type?: 'text' | 'number' | 'generate' | 'flow' | 'uri';
}

export interface ChatGatewayGeneralConfig {
	fields: ChatGatewayGeneralField[];
}

const baseLocale = 'objects.routing.chatGateways';

/** [Claude] the flow select, shared by every provider form */
const flowField: ChatGatewayGeneralField = {
	prop: 'flow',
	label: [
		'objects.routing.flow.flow',
		1,
	],
	type: 'flow',
	required: true,
};

/** [Claude] the webhook uri; a telegram app has none, as it's reached by its own sign-in */
const uriField: ChatGatewayGeneralField = {
	prop: 'uri',
	label: `${baseLocale}.uri`,
	type: 'uri',
	required: true,
};

/**
 * [Claude] The provider fields of the general form, in the order they render after
 * the name (flow and uri included, via `flowField` and `uriField`).
 * Webchat has a form of its own: no flow there, as the flow belongs to its chat tab.
 */
export const chatGatewayGeneralFields: Record<
	string,
	ChatGatewayGeneralConfig
> = {
	[ChatGatewayProvider.TELEGRAM_BOT]: {
		fields: [
			{
				prop: 'token',
				label: `${baseLocale}.metadata.telegramToken`,
				required: true,
			},
			uriField,
			flowField,
		],
	},
	[ChatGatewayProvider.TELEGRAM_APP]: {
		fields: [
			{
				prop: 'apiId',
				label: `${baseLocale}.telegramApp.metadata.apiId`,
				type: 'number',
				required: true,
			},
			flowField,
			{
				prop: 'apiHash',
				label: `${baseLocale}.telegramApp.metadata.apiHash`,
				required: true,
			},
		],
	},
	[ChatGatewayProvider.INFOBIP]: {
		fields: [
			{
				prop: 'apiKey',
				label: `${baseLocale}.metadata.apiKey`,
				required: true,
			},
			uriField,
			flowField,
			{
				prop: 'url',
				label: `${baseLocale}.metadata.baseUrl`,
				required: true,
			},
		],
	},
	[ChatGatewayProvider.MESSENGER]: {
		fields: [
			{
				prop: 'clientId',
				label: `${baseLocale}.messenger.metadata.clientId`,
				required: true,
			},
			uriField,
			{
				prop: 'clientSecret',
				label: `${baseLocale}.messenger.metadata.clientSecret`,
				required: true,
			},
			flowField,
			{
				prop: 'version',
				label: `${baseLocale}.messenger.metadata.apiVersion`,
				hint: `${baseLocale}.messenger.metadata.apiVersionHint`,
			},
		],
	},
	[ChatGatewayProvider.VIBER]: {
		fields: [
			{
				prop: 'token',
				label: [
					'objects.directory.users.token',
					1,
				],
				required: true,
			},
			uriField,
			{
				prop: 'botName',
				label: `${baseLocale}.metadata.botName`,
			},
			flowField,
		],
	},
	[ChatGatewayProvider.CUSTOM]: {
		fields: [
			{
				prop: 'secret',
				label: `${baseLocale}.customChat.metadata.appSecret`,
				hint: `${baseLocale}.customChat.appSecretHint`,
				type: 'generate',
				required: true,
			},
			uriField,
			flowField,
			{
				prop: 'webhook',
				label: `${baseLocale}.customChat.metadata.callback`,
				required: true,
			},
		],
	},
};
