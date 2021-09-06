<template>
  <section>
    <header class="content-header">
      <wt-icon icon-prefix="messenger" icon="web-chat" size="sm"></wt-icon>
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.webchat') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.metadata.view.baseUrl"
        :label="$t('objects.routing.chatGateways.metadata.baseUrl')"
        :disabled="disableUserInput"
        @input="setWebchatView({ prop: 'baseUrl', value: $event })"
      ></wt-input>
      <wt-select
        :value="itemInstance.metadata.view.borderRadiusStyle"
        :options="borderRadiusValues"
        :label="$t('objects.routing.chatGateways.metadata.borderRadius')"
        :track-by="null"
        @input="setWebchatView({prop: 'borderRadiusStyle', value: $event})"
      ></wt-select>
      <wt-select
        v-model="selectedLanguage"
        :options="languages"
        track-by="value"
        :label="$t('objects.routing.chatGateways.metadata.language')"
        @input="setWebchatView({prop: 'lang', value: $event.value})"
      ></wt-select>

      <section>
        <div class="colorpicker-section">
          <wt-input
            v-model="hsl.hue"
            :label="$t('objects.routing.chatGateways.metadata.hue')"
          ></wt-input>
          <wt-input
            v-model="hsl.saturation"
            :label="$t('objects.routing.chatGateways.metadata.saturation')"
          ></wt-input>
          <wt-input
            v-model="hsl.lightness"
            :label="$t('objects.routing.chatGateways.metadata.lightness')"
          ></wt-input>
          <div class="color-template" :style="getHsl"></div>
        </div>
      </section>

      <wt-input
        :value="itemInstance.metadata.view.btnOpacity"
        :v="v.itemInstance.metadata.view.btnOpacity"
        :label="$t('objects.routing.chatGateways.metadata.btnOpacity')"
        :disabled="disableUserInput"
        @input="setWebchatView({prop: 'btnOpacity',value: $event})"
      ></wt-input>

      <wt-input
        :value="itemInstance.metadata.view.logoUrl"
        :label="$t('objects.routing.chatGateways.metadata.logoUrl')"
        :disabled="disableUserInput"
        @input="setWebchatView({ prop: 'logoUrl', value: $event })"
      ></wt-input>

      <wt-button color="primary" @click="copyConfigScript">
        {{ buttonLabel }}
      </wt-button>

    </form>
  </section>
</template>

<script>
import clipboardCopy from 'clipboard-copy';
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

const scriptBeforeConfig = "const script = document.createElement('script');\n"
  + "script.src = 'https://cloud.webitel.ua/omni-widget/WtOmniWidget.umd.js';\n"
  + 'script.onload = function () {\n'
  + "\tconst body = document.querySelector('body');\n"
  + "\tconst widgetEl = document.createElement('div');\n"
  + "\twidgetEl.setAttribute('id', 'wt-omnichannel-widget');\n"
  + '\tbody.appendChild(widgetEl);';

const scriptAfterConfig = "\tconst app = new WtOmniWidget('#wt-omnichannel-widget', config);\n"
  + '};\n'
  + 'document.head.appendChild(script);\n'
  + "const link = document.createElement('link');\n"
  + "link.href = 'https://cloud.webitel.ua/omni-widget/WtOmniWidget.css';\n"
  + "link.type = 'text/css';\n"
  + "link.rel = 'stylesheet';\n"
  + "link.media = 'screen,print';\n"
  + 'document.head.appendChild(link);';

const defaultConfig = {
  baseUrl: 'wss://dev.webitel.com/chat/ws',
  borderRadiusStyle: 'square',
  lang: 'en',
  accentColor: 'hsl(42, 100%, 50%)',
  btnOpacity: 1,
  logoUrl: '',
  // position: {
  //   bottom: 100,
  //   right: 100,
  // },
};

export default {
  name: 'opened-chat-gateway-webchat-view-tab',
  mixins: [openedTabComponentMixin],
  data: () => ({
    isCopied: false,
    borderRadiusValues: ['square', 'rounded'],
    selectedLanguage: {},
    languages: [
      { name: 'English', value: 'en' },
      { name: 'Russian', value: 'ru' },
      { name: 'Ukrainian', value: 'ua' },
    ],
    hsl: {
      hue: '',
      saturation: '',
      lightness: '',
    },
  }),
  computed: {
    buttonLabel() {
      return this.isCopied ? 'Copied' : 'Copy';
    },
    getHsl() {
      const color = `hsl(${this.hsl.hue}, ${this.hsl.saturation}%, ${this.hsl.lightness}%)`;
      if (this.hsl.hue && this.hsl.saturation && this.hsl.lightness) {
        this.setWebchatView({ prop: 'accentColor', value: color });
      }

      return { backgroundColor: color };
    },
  },
  methods: {
    copyConfigScript() {
      this.itemInstance.metadata.view.btnOpacity = this.itemInstance.metadata.view.btnOpacity > 1
        ? this.itemInstance.metadata.view.btnOpacity / 100
        : this.itemInstance.metadata.view.btnOpacity;
      let config = '';
      for (const property in defaultConfig) {
        const value = this.itemInstance.metadata.view[property] ? this.itemInstance.metadata.view[property] : defaultConfig[property];
        config += `\t\t${property}: "${value}",\n`;
      }
      const configScript = `${scriptBeforeConfig}\n\tconst config = {\n${config} \t};\n${scriptAfterConfig}`;

      clipboardCopy(configScript);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 1500);
    },

    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_METADATA`, payload);
      },
      setWebchatView(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_VIEW`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../css/chat-gateways";

.colorpicker-section {
  display: flex;
  grid-column-gap: 2rem;

  .color-template {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    align-self: baseline;
  }
}


</style>
