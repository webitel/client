<template>
  <wt-button
    :color="color"
    @click="copyCode"
  >
    {{ text }}
    <wt-hint
      v-show="!isCopied"
      :icon-color="`on-${color}`"
    >
      {{ $t('objects.routing.chatGateways.webchat.copyCodeHint') }}
    </wt-hint>
  </wt-button>
</template>

<script>
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import clipboardCopy from 'clipboard-copy';
import path from 'path';

import getChatOriginUrl from '../../../scripts/getChatOriginUrl';

const SCRIPT_URL = getChatOriginUrl();
const CHAT_URL = import.meta.env.VITE_CHAT_URL;

const WS_SERVER_URL = SCRIPT_URL.replace(/^http/, 'ws');

const filterEmptyValues = (obj) =>
	Object.entries(obj).reduce(
		(acc, [key, value]) =>
			isEmpty(value)
				? acc
				: {
						...acc,
						[key]: value,
					},
		{},
	);

const generateCode = (config) => `
      const script = document.createElement('script');
      script.src = '${new URL(path.normalize('/omni-widget/WtOmniWidget.umd.js'), SCRIPT_URL)}';
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
      link.href = '${new URL(path.normalize('/omni-widget/WtOmniWidget.css'), SCRIPT_URL)}';
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.media = 'screen,print';
      document.head.appendChild(link);
    `;

export default {
	name: 'CopyCodeButton',
	props: {
		itemInstance: {
			type: Object,
			required: true,
		},
		namespace: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		isCopied: false,
	}),
	computed: {
		text() {
			return this.isCopied
				? this.$t('objects.copied')
				: this.$t('objects.routing.chatGateways.webchat.copyCode');
		},
		color() {
			return this.itemInstance.metadata?._btnCodeDirty
				? 'primary'
				: 'secondary';
		},
	},
	methods: {
		copyCode() {
			const view = this.processViewConfig(this.itemInstance.metadata.view);
			const chat = this.processChatConfig(
				this.itemInstance.metadata.chat,
				this.itemInstance.uri,
			);
			const appointment = this.processAppointmentConfig(
				this.itemInstance.metadata.appointment,
				this.itemInstance.uri,
			);
			const alternativeChannels = this.processAlternativeChannelsConfig(
				this.itemInstance.metadata.alternativeChannels,
			);
			const call = this.processCallConfig(
				this.itemInstance.metadata.call,
				this.itemInstance.uri,
			);

			const captcha = this.processCaptchaConfig(
				this.itemInstance.metadata.captcha,
				this.itemInstance.uri,
			);

			const code = generateCode({
				view,
				chat,
				appointment,
				alternativeChannels,
				call,
				captcha,
			});

			clipboardCopy(code);
			this.isCopied = true;
			setTimeout(() => {
				this.isCopied = false;
			}, 1500);

			this.$emit('copied');
		},

		processViewConfig(view) {
			return filterEmptyValues(view);
		},

		processChatConfig({ enabled, timeoutIsActive, openTimeout, ...rest }, uri) {
			if (!enabled) return undefined;
			const result = {
				...filterEmptyValues(rest),
			};
			if (timeoutIsActive) result.openTimeout = +openTimeout;
			result.url = new URL(path.join(CHAT_URL, uri), WS_SERVER_URL);
			return result;
		},

		processAppointmentConfig(
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
			},
			uri,
		) {
			if (!enabled) return undefined;
			if (!showDefaultHeading) {
				rest.successTitle = successTitle;

				rest.successSubtitle = successSubtitle;
			}
			const result = {
				...filterEmptyValues(rest),
			};
			result.url = new URL(
				path.join(CHAT_URL.replace('chat', 'appointments'), uri),
				SCRIPT_URL,
			);
			return result;
		},

		processAlternativeChannelsConfig(channels) {
			const minifyAltChannels = (altChannels) =>
				Object.entries(altChannels).reduce(
					(channels, [channelName, { enabled, url }]) =>
						enabled && url
							? {
									...channels,
									[channelName]: url,
								}
							: channels,
					{},
				);
			const result = minifyAltChannels(channels);
			return isEmpty(result) ? undefined : result;
		},

		processCallConfig({ enabled, url, ...rest }, uri) {
			if (!enabled) return undefined;
			return {
				url,
				id: uri.slice(1),
			};
		},

		processCaptchaConfig({ enabled, sitekey, showFlag }, uri) {
			if (!enabled) return undefined;
			const verifyUrl = new URL(
				path.join(CHAT_URL, uri, 'captcha'),
				SCRIPT_URL,
			);
			return {
				sitekey,
				verifyUrl,
				showFlag,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
.wt-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  text-wrap: nowrap;
}
</style>
