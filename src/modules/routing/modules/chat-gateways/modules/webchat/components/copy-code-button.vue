<template>
  <wt-button
    :color="color"
    @click="copyCode"
  >
    {{ text }}
    <wt-hint v-show="!isCopied">
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

const filterEmptyValues = (obj) => Object
.entries(obj)
.reduce((acc, [key, value]) => (isEmpty(value) ? acc : { ...acc, [key]: value }), {});

const processViewConfig = (view) => filterEmptyValues(view);

const processChatConfig = ({
                             enabled,
                             timeoutIsActive,
                             openTimeout,
                             ...rest
                           }, uri) => {
  if (!enabled) return undefined;
  const result = { ...filterEmptyValues(rest) };
  if (timeoutIsActive) result.openTimeout = +openTimeout;
  result.url = new URL(path.join(CHAT_URL, uri), WS_SERVER_URL);
  return result;
};

const processAppointmentConfig = ({
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
                                  }, uri) => {
  if (!enabled) return undefined;
  if (!showDefaultHeading) {
    // eslint-disable-next-line no-param-reassign
    rest.successTitle = successTitle;
    // eslint-disable-next-line no-param-reassign
    rest.successSubtitle = successSubtitle;
  }
  const result = { ...filterEmptyValues(rest) };
  result.url = new URL(path.join(CHAT_URL.replace('chat', 'appointments'), uri), SCRIPT_URL);
  return result;
};

const processAlternativeChannelsConfig = (channels) => {
  const minifyAltChannels = (altChannels) => (
    Object.entries(altChannels)
    .reduce((channels, [channelName, { enabled, url }]) => (
      enabled && url ? { ...channels, [channelName]: url } : channels
    ), {})
  );
  const result = minifyAltChannels(channels);
  return isEmpty(result) ? undefined : result;
};

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
  },
  data: () => ({
    isCopied: false,
  }),
  computed: {
    text() {
      return this.isCopied ? this.$t('objects.copied') : this.$t('objects.routing.chatGateways.webchat.copyCode');
    },
    color() {
      return this.itemInstance.metadata?._btnCodeDirty ? 'primary' : 'secondary';
    },
  },
  methods: {
    copyCode() {
      const view = processViewConfig(this.itemInstance.metadata.view);
      const chat = processChatConfig(this.itemInstance.metadata.chat, this.itemInstance.uri);
      const appointment = processAppointmentConfig(
        this.itemInstance.metadata.appointment,
        this.itemInstance.uri,
      );
      const alternativeChannels = processAlternativeChannelsConfig(
        this.itemInstance.metadata.alternativeChannels,
      );

      const code = generateCode({
        view,
        chat,
        appointment,
        alternativeChannels,
      });

      clipboardCopy(code);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 1500);

      this.$emit('copied');
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
