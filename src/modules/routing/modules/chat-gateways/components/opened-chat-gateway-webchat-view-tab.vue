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
        @input="setWebchatViewProperty({prop: 'lang', value: $event.value})"
      ></wt-select>
      <wt-select
        v-model="selectedPosition"
        :options="positionOptions"
        :label="$t('objects.routing.dialplan.position')"
        :disabled="disableUserInput"
        @input="setWebchatViewProperty({ prop: 'position', value: $event.value })"
      ></wt-select>
      <wt-select
        v-model="selectedBorderRadius"
        :options="borderRadiusOptions"
        :label="$t('objects.routing.chatGateways.metadata.borderRadius')"
        :allow-empty="true"
        @input="setWebchatViewProperty({prop: 'borderRadiusStyle', value: $event.value})"
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
        @input="setWebchatViewProperty({prop: 'btnOpacity',value: $event})"
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
import deepMerge from 'deepmerge';
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
    hsl: {
      hue: '',
      saturation: '',
      lightness: '',
    },
  }),

  computed: {
    borderRadiusOptions() {
      return [
        {
          name: this.$t('objects.routing.chatGateways.metadata.square'),
          value: 'square',
        },
        {
          name: this.$t('objects.routing.chatGateways.metadata.rounded'),
          value: 'rounded',
        }];
    },
    positionOptions() {
      return [
        {
          name: this.$t('objects.routing.chatGateways.metadata.right'),
          value: 'right',
        }, {
          name: this.$t('objects.routing.chatGateways.metadata.left'),
          value: 'left',
        },
      ];
    },
    buttonLabel() {
      return this.isCopied ? this.$t('objects.copied') : this.$t('objects.copy');
    },
    getHsl() {
      const color = `hsl(${this.hsl.hue}, ${this.hsl.saturation}%, ${this.hsl.lightness}%)`;
      if (this.hsl.hue && this.hsl.saturation && this.hsl.lightness) {
        this.setWebchatViewProperty({ prop: 'accentColor', value: color });
      }
      return { backgroundColor: color };
    },
  },

  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_METADATA`, payload);
      },
      setWebchatViewProperty(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_WEBCHAT_VIEW_PROPERTY`, payload);
      },
    }),

      clipboardCopy(configScript);
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
