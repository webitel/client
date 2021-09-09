<template>
  <section>
    <header class="content-header">
      <wt-icon icon-prefix="messenger" icon="web-chat" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-select
        v-model="selectedLanguage"
        :options="languages"
        :label="$t('objects.routing.chatGateways.metadata.language')"
        :disabled="disableUserInput"
        :clearable="false"
        track-by="name"
        @input="setWebchatViewProperty({prop: 'lang', value: $event.value })"
      ></wt-select>
      <wt-select
        v-model="selectedPosition"
        :options="positionOptions"
        :label="$t('objects.routing.dialplan.position')"
        :disabled="disableUserInput"
        :clearable="false"
        track-by="name"
        @input="setWebchatViewProperty({ prop: 'position', value: $event.value })"
      ></wt-select>
      <wt-select
        v-model="selectedBorderRadius"
        :options="borderRadiusOptions"
        :label="$t('objects.routing.chatGateways.metadata.borderRadius')"
        :disabled="disableUserInput"
        :clearable="false"
        track-by="name"
        @input="setWebchatViewProperty({ prop: 'borderRadiusStyle', value: $event.value })"
      ></wt-select>
      <section>
        <div class="colorpicker-section">
          <wt-input
            :value="itemInstance.metadata.view.hue"
            :label="$t('objects.routing.chatGateways.metadata.hue')"
            :disabled="disableUserInput"
            @input="setWebchatViewProperty({ prop: 'hue',value: $event })"
          ></wt-input>
          <wt-input
            :value="itemInstance.metadata.view.saturation"
            :label="$t('objects.routing.chatGateways.metadata.saturation')"
            :disabled="disableUserInput"
            @input="setWebchatViewProperty({ prop: 'saturation',value: $event })"
          ></wt-input>
          <wt-input
            :value="itemInstance.metadata.view.lightness"
            :label="$t('objects.routing.chatGateways.metadata.lightness')"
            :disabled="disableUserInput"
            @input="setWebchatViewProperty({ prop: 'lightness',value: $event })"
          ></wt-input>
          <div class="color-template" :style="{ backgroundColor: hslColor }"></div>
        </div>
      </section>
      <wt-input
        :value="itemInstance.metadata.view.btnOpacity"
        :v="v.itemInstance.metadata.view.btnOpacity"
        :label="$t('objects.routing.chatGateways.metadata.btnOpacity')"
        :disabled="disableUserInput"
        @input="setWebchatViewProperty({prop: 'btnOpacity',value: $event })"
      ></wt-input>
      <wt-input
        :value="itemInstance.metadata.view.logoUrl"
        :label="$t('objects.routing.chatGateways.metadata.logoUrl')"
        :disabled="disableUserInput"
        @input="setWebchatViewProperty({ prop: 'logoUrl', value: $event })"
      ></wt-input>
      <wt-button color="primary" @click="copyCode">
        {{ buttonLabel }}
      </wt-button>

    </form>
  </section>
</template>

<script>
import clipboardCopy from 'clipboard-copy';
import deepCopy from 'deep-copy';
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

const BASE_URL = 'wss://cloud.webitel.ua';

const defaultConfig = {
  wsUrl: '',
  borderRadiusStyle: 'square',
  lang: 'en',
  accentColor: 'hsl(42, 100%, 50%)',
  btnOpacity: 1,
  logoUrl: '',
  position: 'right',
};

const getConfig = (userConfig) => Object.keys(defaultConfig).reduce((config, key) => ({
    ...config,
    [key]: userConfig[key] || defaultConfig[key],
  }), {});

const generateCode = ({
 btnOpacity, accentColor, borderRadiusStyle, lang, logoUrl, position, uri,
}) => `
      const script = document.createElement('script');
      script.src = '${BASE_URL}/omni-widget/WtOmniWidget.umd.js';
      script.onload = function () {
        const body = document.querySelector('body');
        const widgetEl = document.createElement('div');
        widgetEl.setAttribute('id', 'wt-omnichannel-widget');
        body.appendChild(widgetEl);

        const config = {
            wsUrl: "${BASE_URL}/chat${uri}",
            borderRadiusStyle: "${borderRadiusStyle}",
            accentColor: "${accentColor}",
            btnOpacity: "${btnOpacity}",
            lang: "${lang}",
            logoUrl: "${logoUrl}",
            position: "${position}",
         };

        const app = new WtOmniWidget('#wt-omnichannel-widget', config);
      };
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = '${BASE_URL}/omni-widget/WtOmniWidget.css';
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.media = 'screen,print';
      document.head.appendChild(link);
    `;

export default {
  name: 'opened-chat-gateway-webchat-view-tab',
  mixins: [openedTabComponentMixin],
  data: () => ({
    isCopied: false,
    selectedLanguage: {},
    selectedBorderRadius: {},
    selectedPosition: {},
    languages: [
      { name: 'English', value: 'en' },
      { name: 'Russian', value: 'ru' },
      { name: 'Ukrainian', value: 'ua' },
    ],
  }),

  computed: {
    borderRadiusOptions() {
      return [{
        name: this.$t('objects.routing.chatGateways.metadata.square'),
        value: 'square',
      }, {
        name: this.$t('objects.routing.chatGateways.metadata.rounded'),
        value: 'rounded',
      }];
    },
    positionOptions() {
      return [{
        name: this.$t('objects.routing.chatGateways.metadata.right'),
        value: 'right',
      }, {
        name: this.$t('objects.routing.chatGateways.metadata.left'),
        value: 'left',
      }];
    },
    buttonLabel() {
      return this.isCopied ? this.$t('objects.copied') : this.$t('objects.copy');
    },
    hslColor() {
      const { view } = this.itemInstance.metadata;
      return view.hue && view.saturation && view.lightness
        ? `hsl(${view.hue}, ${view.saturation}%, ${view.lightness}%`
        : '';
    },
  },

  methods: {
    ...mapActions({
      setWebchatViewProperty(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_VIEW_PROPERTY`, payload);
      },
    }),

    normalizeConfig(_userConfig) {
      const userConfig = deepCopy(_userConfig);
      userConfig.btnOpacity = userConfig.btnOpacity > 1 ? userConfig.btnOpacity / 100 : userConfig.btnOpacity;
      userConfig.accentColor = this.hslColor;
      return userConfig;
    },

    copyCode() {
      const userConfig = this.normalizeConfig(this.itemInstance.metadata.view);
      const config = getConfig(userConfig);
      const code = generateCode({ ...config, uri: this.itemInstance.uri });
      clipboardCopy(code);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 1500);
    },
  },
  watch: {
    hslColor(value) {
      this.setWebchatViewProperty({ prop: 'accentColor', value });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/chat-gateways";

.colorpicker-section {
  display: flex;
  grid-column-gap: 2rem;

  .color-template {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    align-self: baseline;
  }
}
</style>
