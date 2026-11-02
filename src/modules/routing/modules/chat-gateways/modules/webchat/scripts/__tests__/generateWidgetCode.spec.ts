import { getChatGatewayDefaults } from '@webitel/api-services/api';
import { ChatGatewayProvider } from '@webitel/api-services/enums';
import { describe, expect, it } from 'vitest';

import type { WebchatMetadata } from '../../types/WebchatMetadata';
import { generateWidgetCode } from '../generateWidgetCode';

const urls = {
	servicesOrigin: 'https://example.com',
	chatPath: '/chat',
};

const webchatMetadata = () =>
	structuredClone(
		getChatGatewayDefaults(ChatGatewayProvider.WEBCHAT).metadata,
	) as unknown as WebchatMetadata;

/** [Claude] the widget config embedded in the generated snippet */
const getConfig = (metadata: WebchatMetadata) => {
	const code = generateWidgetCode(
		{
			uri: '/bot',
			metadata,
		},
		urls,
	);
	const [, config] = code.match(/const config = ([\s\S]*?);\n/) ?? [];
	return JSON.parse(config);
};

describe('generateWidgetCode', () => {
	it('loads the widget bundle from the services host', () => {
		const code = generateWidgetCode(
			{
				uri: '/bot',
				metadata: webchatMetadata(),
			},
			urls,
		);
		expect(code).toContain(
			"script.src = 'https://example.com/omni-widget/WtOmniWidget.umd.js'",
		);
		expect(code).toContain(
			"link.href = 'https://example.com/omni-widget/WtOmniWidget.css'",
		);
	});

	it('connects the chat over a websocket and leaves disabled sections out', () => {
		expect(getConfig(webchatMetadata())).toEqual({
			view: {
				lang: 'en',
			},
			chat: {
				url: 'wss://example.com/chat/bot',
			},
		});
	});

	it('adds the enabled sections', () => {
		const metadata = webchatMetadata();
		metadata.chat.timeoutIsActive = true;
		metadata.chat.openTimeout = '15';
		metadata.appointment.enabled = true;
		metadata.appointment.showDefaultHeading = false;
		metadata.appointment.successTitle = 'Thanks';
		metadata.alternativeChannels.viber = {
			enabled: true,
			url: 'viber://bot',
		};
		metadata.alternativeChannels.telegram = {
			enabled: false,
			url: 'tg://bot',
		};
		metadata.call.enabled = true;
		metadata.call.url = 'wss://example.com/sip';
		metadata.captcha.enabled = true;
		metadata.captcha.sitekey = 'key';

		expect(getConfig(metadata)).toMatchObject({
			chat: {
				openTimeout: 15,
			},
			appointment: {
				successTitle: 'Thanks',
				url: 'https://example.com/appointments/bot',
			},
			alternativeChannels: {
				viber: 'viber://bot',
			},
			call: {
				url: 'wss://example.com/sip',
				id: 'bot',
			},
			captcha: {
				sitekey: 'key',
				verifyUrl: 'https://example.com/chat/bot/captcha',
			},
		});
	});

	it('keeps the custom success texts out while the default heading is on', () => {
		const metadata = webchatMetadata();
		metadata.appointment.enabled = true;
		metadata.appointment.successTitle = 'Thanks';
		expect(getConfig(metadata).appointment).not.toHaveProperty('successTitle');
	});
});
