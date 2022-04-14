<template>
  <wt-button
    :color="color"
    @click="copyCode"
  >
    {{ text }}
    <wt-icon-btn
      v-show="!isCopied"
      icon="rounded-info"
      :tooltip="$t('objects.routing.chatGateways.webchat.copyCodeHint')"
    ></wt-icon-btn>
  </wt-button>
</template>

<script>
import path from 'path';
import clipboardCopy from 'clipboard-copy';
import getChatOriginUrl from '../../scripts/getChatOriginUrl';

const defaultConfig = {
  wsUrl: '',
  borderRadiusStyle: 'square',
  lang: 'en',
  accentColor: 'hsl(42, 100%, 50%)',
  btnOpacity: 1,
  logoUrl: '',
  position: 'right',
  openTimeout: false,
  alternativeChannels: null,
};

const SCRIPT_URL = getChatOriginUrl();
const CHAT_URL = process.env.VUE_APP_CHAT_URL;

const WS_SERVER_URL = SCRIPT_URL.replace(/^http/, 'ws');

const getConfig = (userConfig) => Object.keys(defaultConfig)
                                        .reduce((config, key) => ({
                                          ...config,
                                          [key]: userConfig[key] || defaultConfig[key],
                                        }), {});

const minifyAltChannels = (altChannels) => (
  Object.entries(altChannels)
        .reduce((channels, [channelName, { enabled, url }]) => (
          enabled && url ? { ...channels, [channelName]: url } : channels
        ), {})
);

const generateCode = ({
                        btnOpacity,
                        accentColor,
                        borderRadiusStyle,
                        lang,
                        logoUrl,
                        position,
                        openTimeout,
                        uri,
                        alternativeChannels,
                      }) => `
      const script = document.createElement('script');
      script.src = '${new URL(path.normalize('/omni-widget/WtOmniWidget.umd.js'), SCRIPT_URL)}';
      script.onload = function () {
        const body = document.querySelector('body');
        const widgetEl = document.createElement('div');
        widgetEl.setAttribute('id', 'wt-omnichannel-widget');
        body.appendChild(widgetEl);

        const config = {
            wsUrl: "${new URL(path.join(CHAT_URL, uri), WS_SERVER_URL)}",
            borderRadiusStyle: "${borderRadiusStyle}",
            accentColor: "${accentColor}",
            btnOpacity: "${btnOpacity}",
            lang: "${lang}",
            logoUrl: "${logoUrl}",
            position: "${position}",
            openTimeout: ${openTimeout},
            alternativeChannels: ${JSON.stringify(minifyAltChannels(alternativeChannels))},
         };

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
  name: 'copy-code-button',
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
      const openTimeout = this.itemInstance.metadata.timeoutIsActive
        ? this.itemInstance.metadata.openTimeout
        : false;
      const config = getConfig(this.itemInstance.metadata);
      const code = generateCode({
                                  ...config,
                                  openTimeout,
                                  uri: this.itemInstance.uri,
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
  ::v-deep .wt-tooltip {
    width: 400px;
  }
}
</style>
