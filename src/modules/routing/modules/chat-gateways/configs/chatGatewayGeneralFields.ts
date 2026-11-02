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
	/** [Claude] `generate`: a secret the user may generate instead of typing */
	type?: 'text' | 'number' | 'generate';
}

export interface ChatGatewayGeneralConfig {
	fields: ChatGatewayGeneralField[];
	/** [Claude] a telegram app is reached by its own sign-in, not by a webhook uri */
	hasUri?: boolean;
}

const baseLocale = 'objects.routing.chatGateways';

/**
 * [Claude] The provider fields of the general form; name, uri and flow are the
 * same for every provider. Webchat has a form of its own: no flow there, as the
 * flow belongs to its chat tab.
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
		],
	},
	[ChatGatewayProvider.TELEGRAM_APP]: {
		hasUri: false,
		fields: [
			{
				prop: 'apiId',
				label: `${baseLocale}.telegramApp.metadata.apiId`,
				type: 'number',
				required: true,
			},
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
			{
				prop: 'clientSecret',
				label: `${baseLocale}.messenger.metadata.clientSecret`,
				required: true,
			},
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
			{
				prop: 'botName',
				label: `${baseLocale}.metadata.botName`,
			},
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
			{
				prop: 'webhook',
				label: `${baseLocale}.customChat.metadata.callback`,
				required: true,
			},
		],
	},
};
