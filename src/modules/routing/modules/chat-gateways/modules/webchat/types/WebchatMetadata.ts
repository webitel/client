import type { WebchatAlternativeChannel } from '@webitel/api-services/enums';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import type { Ref } from 'vue';
import { computed } from 'vue';

interface Lookup {
	id?: string | number;
	name?: string;
}

type NumberLike = string | number | null;

/**
 * [Claude] A webchat gateway's metadata, as `getChatGatewayDefaults` seeds it
 * and `ChatGatewaysAPI.get` parses it: the shared schema keeps every section
 * optional, as other providers have none of them.
 */
export interface WebchatMetadata {
	allowOrigin: string[];
	readTimeout: NumberLike;
	writeTimeout: NumberLike;
	handshakeTimeout: NumberLike;
	mediaMaxSize: NumberLike;
	_btnCodeDirty: boolean;
	view: {
		borderRadiusStyle: string;
		lang: string;
		btnOpacity: string;
		logoUrl: string;
		accentColor: string;
		position: string;
	};
	captcha: {
		enabled: boolean;
		sitekey: string;
		secret: string;
		threshold: NumberLike;
		showFlag: boolean | number;
	};
	chat: {
		enabled: boolean;
		timeoutIsActive: boolean;
		openTimeout: NumberLike;
		url: string;
	};
	appointment: {
		enabled: boolean;
		url: string;
		queue?: Lookup | null;
		communicationType?: Lookup | null;
		duration: string;
		days: NumberLike;
		availableAgents: NumberLike;
		successTitle: string;
		successSubtitle: string;
		showDefaultHeading: boolean;
		showEmailField: boolean;
		showMessageField: boolean;
	};
	call: {
		enabled: boolean;
		url: string;
		flow?: Lookup | null;
		id: string;
	};
	alternativeChannels: Record<
		WebchatAlternativeChannel,
		{
			url: string;
			enabled: boolean;
		}
	>;
}

/** [Claude] the card's metadata, typed as a webchat one for the webchat tabs */
export const useWebchatMetadata = (modelValue: Ref<ChatGatewayCard>) =>
	computed(() => modelValue.value.metadata as unknown as WebchatMetadata);
