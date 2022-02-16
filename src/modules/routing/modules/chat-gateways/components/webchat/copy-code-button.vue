<template>
  <wt-button wide @click="copyCode">
    {{ text }}
  </wt-button>
</template>

<script>
import clipboardCopy from 'clipboard-copy';

const defaultConfig = {
  wsUrl: '',
  borderRadiusStyle: 'square',
  lang: 'en',
  accentColor: 'hsl(42, 100%, 50%)',
  btnOpacity: 1,
  logoUrl: '',
  position: 'right',
  openTimeout: false,
};

const SCRIPT_URL = window.location.origin;
const SERVER_URL = SCRIPT_URL.replace(/^http/, 'ws');

const getConfig = (userConfig) => Object.keys(defaultConfig)
                                        .reduce((config, key) => ({
                                          ...config,
                                          [key]: userConfig[key] || defaultConfig[key],
                                        }), {});

const generateCode = ({
                        btnOpacity,
                        accentColor,
                        borderRadiusStyle,
                        lang,
                        logoUrl,
                        position,
                        openTimeout,
                        uri,
                      }) => `
      const script = document.createElement('script');
      script.src = '${SCRIPT_URL}/omni-widget/WtOmniWidget.umd.js';
      script.onload = function () {
        const body = document.querySelector('body');
        const widgetEl = document.createElement('div');
        widgetEl.setAttribute('id', 'wt-omnichannel-widget');
        body.appendChild(widgetEl);

        const config = {
            wsUrl: "${SERVER_URL}/chat${uri}",
            borderRadiusStyle: "${borderRadiusStyle}",
            accentColor: "${accentColor}",
            btnOpacity: "${btnOpacity}",
            lang: "${lang}",
            logoUrl: "${logoUrl}",
            position: "${position}",
            openTimeout: ${openTimeout}
         };

        const app = new WtOmniWidget('#wt-omnichannel-widget', config);
      };
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = '${SCRIPT_URL}/omni-widget/WtOmniWidget.css';
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
      return this.isCopied ? this.$t('objects.copied') : this.$t('objects.routing.chatGateways.metadata.copy');
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
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
