import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';

import type { WebchatMetadata } from '../types/WebchatMetadata';

/** [Claude] where the widget's script and services live */
export interface WidgetUrls {
	/** [Claude] origin of the services host, e.g. `https://example.com` */
	servicesOrigin: string;
	/** [Claude] path of the chat service on that host, e.g. `/chat` */
	chatPath: string;
}

/** [Claude] `chat` + `/bot` → `/chat/bot`: the env path may come with or without its slash */
const joinPath = (...parts: string[]) =>
	`/${parts.join('/')}`.replace(/\/{2,}/g, '/');

const filterEmptyValues = (obj: object) =>
	Object.fromEntries(
		Object.entries(obj).filter(([, value]) => !isEmpty(value)),
	);

const getChatConfig = (
	{ enabled, timeoutIsActive, openTimeout, ...rest }: WebchatMetadata['chat'],
	uri: string,
	{ servicesOrigin, chatPath }: WidgetUrls,
) => {
	if (!enabled) return undefined;
	return {
		...filterEmptyValues(rest),
		...(timeoutIsActive && {
			openTimeout: +(openTimeout ?? 0),
		}),
		url: new URL(
			joinPath(chatPath, uri),
			servicesOrigin.replace(/^http/, 'ws'),
		),
	};
};

const getAppointmentConfig = (
	{
		enabled,
		queue,
		communicationType,
		days,
		duration,
		availableAgents,
		showDefaultHeading,
		successTitle,
		successSubtitle,
		...rest
	}: WebchatMetadata['appointment'],
	uri: string,
	{ servicesOrigin, chatPath }: WidgetUrls,
) => {
	if (!enabled) return undefined;
	return {
		...filterEmptyValues({
			...rest,
			// [Claude] custom texts only replace the default heading when it is off
			...(!showDefaultHeading && {
				successTitle,
				successSubtitle,
			}),
		}),
		url: new URL(
			joinPath(chatPath.replace('chat', 'appointments'), uri),
			servicesOrigin,
		),
	};
};

const getAlternativeChannelsConfig = (
	channels: WebchatMetadata['alternativeChannels'],
) => {
	const enabledChannels = Object.fromEntries(
		Object.entries(channels)
			.filter(([, { enabled, url }]) => enabled && url)
			.map(([channel, { url }]) => [
				channel,
				url,
			]),
	);
	return isEmpty(enabledChannels) ? undefined : enabledChannels;
};

const getCallConfig = (
	{ enabled, url }: WebchatMetadata['call'],
	uri: string,
) =>
	enabled
		? {
				url,
				id: uri.slice(1),
			}
		: undefined;

const getCaptchaConfig = (
	{ enabled, sitekey, showFlag }: WebchatMetadata['captcha'],
	uri: string,
	{ servicesOrigin, chatPath }: WidgetUrls,
) =>
	enabled
		? {
				sitekey,
				verifyUrl: new URL(joinPath(chatPath, uri, 'captcha'), servicesOrigin),
				showFlag,
			}
		: undefined;

/**
 * [Claude] The snippet a client puts on their site to run the webchat widget:
 * it loads the widget bundle and starts it with the gateway's settings.
 * Disabled sections and empty values are left out of the config.
 */
export const generateWidgetCode = (
	{
		uri,
		metadata,
	}: {
		uri: string;
		metadata: WebchatMetadata;
	},
	urls: WidgetUrls,
) => {
	const config = {
		view: filterEmptyValues(metadata.view),
		chat: getChatConfig(metadata.chat, uri, urls),
		appointment: getAppointmentConfig(metadata.appointment, uri, urls),
		alternativeChannels: getAlternativeChannelsConfig(
			metadata.alternativeChannels,
		),
		call: getCallConfig(metadata.call, uri),
		captcha: getCaptchaConfig(metadata.captcha, uri, urls),
	};
	const assetUrl = (file: string) =>
		new URL(`/omni-widget/${file}`, urls.servicesOrigin);

	return `
      const script = document.createElement('script');
      script.src = '${assetUrl('WtOmniWidget.umd.js')}';
      script.onload = function () {
        const body = document.querySelector('body');
        const widgetEl = document.createElement('div');
        widgetEl.setAttribute('id', 'wt-omnichannel-widget');
        body.appendChild(widgetEl);

        const config = ${JSON.stringify(config, null, 4)};

        const app = new WtOmniWidget('#wt-omnichannel-widget', config);
      };
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = '${assetUrl('WtOmniWidget.css')}';
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.media = 'screen,print';
      document.head.appendChild(link);
    `;
};
