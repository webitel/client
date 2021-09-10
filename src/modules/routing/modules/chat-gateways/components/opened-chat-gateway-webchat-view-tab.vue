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
        @input="setWebchatViewProperty({ prop: 'lang', value: $event.value })"
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
      <wt-input
        :value="itemInstance.metadata.view.logoUrl"
        :label="$t('objects.routing.chatGateways.metadata.logoUrl')"
        :disabled="disableUserInput"
        @input="setWebchatViewProperty({ prop: 'logoUrl', value: $event })"
      ></wt-input>
      <section>
        <div class="colorpicker-section">
          <div class="slider-wrapper">
            <wt-label>{{ colorPickerTitle }}</wt-label>
            <color-picker v-model="color"></color-picker>
            <wt-label>{{ opacityPickerTitle }}</wt-label>
            <div class="alphapicker-wrapper">
              <opacity-picker :value="color" @change="setAlpha"></opacity-picker>
            </div>
          </div>
          <div class="color-template" :style="{ backgroundColor: hslColor, opacity: opacityValue }"></div>
        </div>
      </section>
      <section class="button-wrapper">
      <wt-button color="primary" @click="copyCode" large>
        {{ buttonLabel }}
      </wt-button>
      </section>
    </form>
  </section>
</template>

<script>
import clipboardCopy from 'clipboard-copy';
import deepCopy from 'deep-copy';
import { mapActions } from 'vuex';
import { Slider, Alpha } from 'vue-color';
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
                        uri,
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
  components: {
    ColorPicker: Slider,
    OpacityPicker: Alpha,
  },
  data: () => ({
    isCopied: false,
    selectedBorderRadius: {},
    selectedPosition: {},
    selectedLanguage: {},
    color: {
      a: 1,
      rgba: { r: 0, g: 0, b: 0, a: 1, },
      hsl: { h: 2, s: 100, l: 50, },
    },
  }),

  computed: {
    languages() {
      return [{
        name: this.$t('reusable.lang.en'),
        value: 'en',
      }, {
        name: this.$t('reusable.lang.ru'),
        value: 'ru',
      }, {
        name: this.$t('reusable.lang.ua'),
        value: 'ua',
      }];
    },
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
      return this.isCopied ? this.$t('objects.copied') : this.$t('objects.routing.chatGateways.metadata.copy');
    },
    colorPickerTitle() {
      return this.$t('objects.routing.chatGateways.metadata.btnColor');
    },
    opacityPickerTitle() {
      return this.$t('objects.routing.chatGateways.metadata.btnOpacity');
    },
    hslColor() {
      const h = Math.floor(this.color.hsl.h);
      const s = this.color.hsl.s.toFixed(2) * 100;
      const l = this.color.hsl.l.toFixed(2) * 100;
      return `hsl(${h}, ${s}%, ${l}%)`;
    },

    opacityValue() {
      return this.color.a;
    },
  },

  methods: {
    ...mapActions({
      setWebchatViewProperty(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_VIEW_PROPERTY`, payload);
      },
    }),

    setAlpha(value) {
      this.color = {
        ...this.color,
        rgba: {
          ...this.color.rgba,
          a: value.a,
        },
        a: value.a,
      };
    },

    normalizeConfig(_userConfig) {
      const userConfig = deepCopy(_userConfig);
      userConfig.accentColor = this.hslColor;
      userConfig.btnOpacity = this.opacityValue;
      return userConfig;
    },

    copyCode() {
      const userConfig = this.normalizeConfig(this.itemInstance.metadata.view);
      const config = getConfig(userConfig);
      const code = generateCode({
        ...config,
        uri: this.itemInstance.uri,
      });
      clipboardCopy(code);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 1500);
    },
  },
  watch: {
    hslColor(value) {
      this.setWebchatViewProperty({
        prop: 'accentColor',
        value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/chat-gateways";

.colorpicker-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-gap: var(--component-spacing);

  .wt-label {
    margin: var(--component-spacing);
  }

  .slider-wrapper ::v-deep {
    width: 100%;
    margin: auto;

    .vc-slider {
      width: 100%;

      .vc-hue {
        width: 100%;
        border-radius: 8px;
      }
    }

    .vc-slider-swatches {
      display: none;
    }
  }

  .alphapicker-wrapper ::v-deep {
    position: relative;
    height: 12px;
    margin: var(--component-spacing) auto;

    .vc-checkerboard {
      border-radius: 8px;
    }

    .vc-alpha-gradient {
      border-radius: 8px;
    }

    .vc-alpha-picker {
      width: 14px;
      height: 14px;
      border-radius: 6px;
      transform: translate(-6px, -2px);
      background-color: rgb(248, 248, 248);
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
    }
  }

  .color-template {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    border-radius: 50%;
  }
}

.button-wrapper {
  margin: auto;
}
</style>
