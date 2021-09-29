<template>
  <section>
    <header class="content-header">
      <wt-icon icon-prefix="messenger" icon="web-chat" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat') }}</h3>
    </header>
    <section class="webchat-view-main">
      <section class="chat-preview-section">
        <div id="chat-preview"></div>
        <div class="copy-button-wrapper">
          <wt-button wide @click="copyCode">
            {{ buttonLabel }}
          </wt-button>
        </div>
      </section>
      <section class="chat-config-section">
        <form class="object-input-grid object-input-grid__1-col">
          <wt-select
            v-model="selectedLanguage"
            :options="languages"
            :label="$t('objects.routing.chatGateways.metadata.language')"
            :disabled="disableUserInput"
            :clearable="false"
            track-by="name"
            @input="setItemMetadata({ prop: 'lang', value: $event.value })"
          ></wt-select>
          <wt-select
            v-model="selectedPosition"
            :options="positionOptions"
            :label="$t('objects.routing.dialplan.position')"
            :disabled="disableUserInput"
            :clearable="false"
            track-by="name"
            @input="setItemMetadata({ prop: 'position', value: $event.value })"
          ></wt-select>
          <wt-select
            v-model="selectedBorderRadius"
            :options="borderRadiusOptions"
            :label="$t('objects.routing.chatGateways.metadata.borderRadius')"
            :disabled="disableUserInput"
            :clearable="false"
            track-by="name"
            @input="setItemMetadata({ prop: 'borderRadiusStyle', value: $event.value })"
          ></wt-select>
          <wt-input
            :value="itemInstance.metadata.logoUrl"
            :label="$t('objects.routing.chatGateways.metadata.logoUrl')"
            :disabled="disableUserInput"
            @input="setItemMetadata({ prop: 'logoUrl', value: $event })"
          ></wt-input>
          <section class="switcher-section">
            <wt-switcher
              :value="itemInstance.metadata.timeoutIsActive"
              :label="this.$t('objects.routing.chatGateways.metadata.openTimeout')"
              @change="setItemMetadata({ prop: 'timeoutIsActive', value: $event })"
            ></wt-switcher>
            <wt-input
              :value="itemInstance.metadata.openTimeout"
              :v="v.itemInstance.metadata.openTimeout"
              :label="this.$t('date.sec')"
              :disabled="disableOpenTimeout"
              @input="setItemMetadata({ prop: 'openTimeout', value: $event })"
            ></wt-input>
          </section>
          <section>
            <div class="colorpicker-section">
              <div class="slider-wrapper">
                <wt-label>{{ this.$t('objects.routing.chatGateways.metadata.btnColor') }}</wt-label>
                <color-picker :value="color" @input="setColor"></color-picker>
                <wt-label>{{ this.$t('objects.routing.chatGateways.metadata.btnOpacity') }}
                </wt-label>
                <div class="opacity-wrapper">
                  <opacity-picker :value="color" @change="setAlpha"></opacity-picker>
                </div>
              </div>
            </div>
          </section>
          <section class="chat-button-preview-section">
            <div id="chat-button-preview"></div>
          </section>
        </form>
      </section>
    </section>
  </section>
</template>

<script>
import clipboardCopy from 'clipboard-copy';
import { mapActions } from 'vuex';
import { Slider, Alpha } from 'vue-color';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import webchatViewMixin from '../mixins/webchatViewMixin';

const BASE_URL = 'wss://cloud.webitel.ua';

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
            openTimeout: ${openTimeout}
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
  mixins: [openedTabComponentMixin, webchatViewMixin],
  components: {
    ColorPicker: Slider,
    OpacityPicker: Alpha,
  },
  data: () => ({
    chatPreview: null,
    buttonPreview: null,
  }),
  computed: {
    openTimeoutValue() {
      return this.itemInstance.metadata.timeoutIsActive ? this.itemInstance.metadata.openTimeout : false;
    },
  },
  watch: {
    'itemInstance.metadata': {
      handler() {
        this.updateChatPreview();
        this.updateButtonPreview();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_METADATA`, payload);
      },
    }),
    getPreviewConfig(previewMode) {
      return {
        ...this.itemInstance.metadata,
        position: 'static',
        _previewMode: previewMode,
      };
    },
    initWidgetPreview() {
      const baseUrl = process.env.VUE_APP_OMNI_WIDGET_URL;

      let script = document.createElement('script');
      script.src = `${baseUrl}/WtOmniWidget.umd.js`;
      script.onload = () => {
        this.chatPreview = new WtOmniWidget('#chat-preview', this.getPreviewConfig('chat'));
      };
      document.head.appendChild(script);

      script = document.createElement('script');
      script.src = `${baseUrl}/WtOmniWidget.umd.js`;
      script.onload = () => {
        this.buttonPreview = new WtOmniWidget('#chat-button-preview', this.getPreviewConfig('button'));
      };
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = `${baseUrl}/WtOmniWidget.css`;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.media = 'screen,print';
      document.head.appendChild(link);
    },
    updateChatPreview() {
      this.chatPreview.setConfig(this.getPreviewConfig('chat'));
    },
    updateButtonPreview() {
      this.buttonPreview.setConfig(this.getPreviewConfig('button'));
    },
    copyCode() {
      const config = getConfig(this.itemInstance.metadata);
      const code = generateCode({
        ...config,
        uri: this.itemInstance.uri,
        openTimeout: this.openTimeoutValue,
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
@import "../css/chat-gateways";

.webchat-view-main {
  display: flex;
  gap: var(--component-spacing);
  justify-content: space-between;

  .chat-preview-section {
    flex-basis: max-content;
    display: flex;
    flex-direction: column;
  }

  .chat-config-section {
    flex-grow: 1;
  }

  .switcher-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--component-spacing);

    .wt-input {
      width: 80%;
    }
  }

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
      width: 80%;
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

    .opacity-wrapper ::v-deep {
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
  }

  .copy-button-wrapper {
    margin-top: var(--component-spacing);
  }

  .chat-button-preview-section {
    align-self: center;
    justify-self: center;
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-button-preview-section::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("../assets/transparent-img.svg") repeat;
    opacity: 0.3;
  }
}

</style>
