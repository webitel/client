<template>
  <section>
    <header class="content-header">
      <wt-icon icon="web-chat" icon-prefix="messenger" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat') }}</h3>
    </header>
    <section class="webchat-view-main">
      <section class="chat-preview-section">
        <div id="chat-preview"></div>
        <section class="chat-button-preview-section">
          <div id="chat-button-preview"></div>
        </section>
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
            :clearable="false"
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.metadata.language')"
            :options="languages"
            track-by="name"
            @input="setItemMetadata({ prop: 'lang', value: $event.value })"
          ></wt-select>
          <wt-select
            v-model="selectedPosition"
            :clearable="false"
            :disabled="disableUserInput"
            :label="$t('objects.routing.dialplan.position')"
            :options="positionOptions"
            track-by="name"
            @input="setItemMetadata({ prop: 'position', value: $event.value })"
          ></wt-select>
          <wt-select
            v-model="selectedBorderRadius"
            :clearable="false"
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.metadata.borderRadius')"
            :options="borderRadiusOptions"
            track-by="name"
            @input="setItemMetadata({ prop: 'borderRadiusStyle', value: $event.value })"
          ></wt-select>
          <wt-input
            :disabled="disableUserInput"
            :label="$t('objects.routing.chatGateways.metadata.logoUrl')"
            :label-props="{
              hint: this.$t('objects.routing.chatGateways.metadata.logoHint'),
              hintPosition: 'right',
             }"
            :v="v.itemInstance.metadata.logoUrl"
            :value="itemInstance.metadata.logoUrl"
            @input="setItemMetadata({ prop: 'logoUrl', value: $event })"
          ></wt-input>
          <section class="switcher-section">
            <wt-switcher
              :label="this.$t('objects.routing.chatGateways.metadata.openTimeout')"
              :value="itemInstance.metadata.timeoutIsActive"
              @change="setItemMetadata({ prop: 'timeoutIsActive', value: $event })"
            ></wt-switcher>
            <wt-input
              :disabled="disableOpenTimeout"
              :label="this.$t('date.sec')"
              :v="v.itemInstance.metadata.openTimeout"
              :value="itemInstance.metadata.openTimeout"
              @input="setItemMetadata({ prop: 'openTimeout', value: $event })"
            ></wt-input>
          </section>
          <section>
            <div class="colorpicker-section">
              <wt-label>{{ this.$t('objects.routing.chatGateways.metadata.btnColor') }}</wt-label>
              <color-picker :value="color" class="colorpicker" @input="setColor"/>
            </div>
          </section>
        </form>
      </section>
    </section>
  </section>
</template>

<script>
import clipboardCopy from 'clipboard-copy';
import { Chrome } from 'vue-color';
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import webChatPreviewMixin from '../mixins/webChatPreviewMixin';
import webChatViewFormMixin from '../mixins/webChatViewFormMixin';

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

const SCRIPT_URL = window.location.origin;
const SERVER_URL = SCRIPT_URL.replace(/^http/, 'ws');

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
  name: 'opened-chat-gateway-webchat-view-tab',
  mixins: [openedTabComponentMixin, webChatViewFormMixin, webChatPreviewMixin],
  components: {
    ColorPicker: Chrome,
  },
  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_METADATA`, payload);
      },
    }),
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
@import "../css/chat-gateways";

.webchat-view-main {
  width: 50%;
  min-width: 760px;
  display: flex;
  gap: var(--spacing-sm);

  .chat-preview-section ::v-deep {
    flex-basis: max-content;
    display: flex;
    flex-direction: column;

    #wt-omni-widget.wt-omni-widget--position-static {
      z-index: 1;
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
      margin-top: var(--spacing-sm);
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

    .copy-button-wrapper {
      margin: var(--spacing-sm) 0;
    }
  }

  .chat-config-section {
    .switcher-section {
      display: flex;
      gap: var(--spacing-sm);
      flex-shrink: 0;
      align-items: center;
    }

    .colorpicker-section {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      grid-gap: var(--spacing-sm);

      .colorpicker {
        width: 100%;
      }
    }
  }
}

</style>
