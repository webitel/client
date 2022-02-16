<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :primary-action="save"
        :primary-text="computePrimaryText"
        :hide-primary="!hasSaveActionAccess"
        :primary-disabled="computeDisabled"
        :secondary-action="close"
      >
        <headline-nav :path="path"></headline-nav>
        <template slot="actions">
          <webchat-copy-code-button
            v-if="isWebchat"
            :item-instance="itemInstance"
          ></webchat-copy-code-button>
        </template>
      </object-header>
    </template>

    <template slot="main">
      <div class="main-container">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :v="$v"
          :namespace="namespace"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>

import {
 required, minValue, maxValue, minLength, numeric, url,
} from 'vuelidate/lib/validators';
import openedObjectMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import OpenedChatTelegram from './telegram/opened-chat-gateway-telegram-general-tab.vue';
import OpenedChatFacebook from './facebook/opened-chat-gateway-facebook-general-tab.vue';
import OpenedChatInfobip from './infobip/opened-chat-gateway-infobip-general-tab.vue';
import OpenedViberChat from './viber/opened-chat-gateway-viber-general-tab.vue';
import OpenedWebchat from './webchat/opened-chat-gateway-webchat-general-tab.vue';
import OpenedWebchatView from './webchat/opened-chat-gateway-webchat-view-tab.vue';
import OpenedWebchatAlternativeChannels from './webchat/opened-chat-gateway-webchat-alternative-channels-tab.vue';
import WebchatCopyCodeButton from './webchat/copy-code-button.vue';

export default {
  name: 'opened-chat-gateway',
  mixins: [openedObjectMixin],
  components: {
    OpenedChatTelegram,
    OpenedChatFacebook,
    OpenedChatInfobip,
    OpenedViberChat,
    OpenedWebchat,
    OpenedWebchatView,
    OpenedWebchatAlternativeChannels,
    WebchatCopyCodeButton,
  },

  data: () => ({
    namespace: 'routing/chatGateways',
  }),

  validations() {
    const defaults = {
      name: { required },
      uri: { required, minLength: minLength(3) },
      flow: {
        name: { required },
      },
    };
    switch (this.chatType) {
      case 'telegram':
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              token: { required },
            },
          },
        };
      case 'facebook':
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              AccessToken: { required },
              VerifyToken: { required },
              url: { required },
            },
          },
        };
      case 'infobip':
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              apiKey: { required },
              number: { required },
              url: { required },
            },
          },
        };
      case 'webchat':
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              readTimeout: {
                numeric,
                minValue: minValue(30),
                maxValue: maxValue(300),
              },
              writeTimeout: {
                numeric,
                minValue: minValue(1),
                maxValue: maxValue(60),
              },
              handshakeTimeout: {
                numeric,
                minValue: minValue(10),
                maxValue: maxValue(60),
              },
              openTimeout: {
                numeric,
                minValue: minValue(0),
              },
              logoUrl: { url },
            },
          },
        };
      case 'viber':
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              token: { required },
            },
          },
        };
      default:
        return { itemInstance: { ...defaults } };
    }
  },

  computed: {
    chatType() {
      if (this.$route.path.includes('telegram')) {
        return 'telegram';
      }
      if (this.$route.path.includes('facebook')) {
        return 'facebook';
      }
      if (this.$route.path.includes('infobip')) {
        return 'infobip';
      }
      if (this.$route.path.includes('viber')) {
        return 'viber';
      }
      if (this.$route.path.includes('webchat')) {
        return 'webchat';
      }
      return '';
    },

    tabs() {
      const telegramChat = {
        text: this.$t('objects.routing.chatGateways.telegram'),
        value: 'OpenedChatTelegram',
      };

      const facebookChat = {
        text: this.$t('objects.routing.chatGateways.facebook'),
        value: 'OpenedChatFacebook',
      };

      const infobipChat = {
        text: this.$t('objects.routing.chatGateways.infobip'),
        value: 'OpenedChatInfobip',
      };

      const viberChat = {
        text: this.$t('objects.routing.chatGateways.viber'),
        value: 'OpenedViberChat',
      };

      const webChat = {
        text: this.$t('objects.routing.chatGateways.webchat.webchat'),
        value: 'OpenedWebchat',
      };
      const webchatView = {
        text: this.$t('objects.routing.chatGateways.webchat.view.view'),
        value: 'OpenedWebchatView',
      };
      const webchatAlternativeChannels = {
        text: this.$t('objects.routing.chatGateways.webchat.alternativeChannels.alternativeChanngels'),
        value: 'OpenedWebchatAlternativeChannels',
      };

      switch (this.chatType) {
        case 'telegram':
          return [telegramChat];
        case 'facebook':
          return [facebookChat];
        case 'infobip':
          return [infobipChat];
        case 'viber':
          return [viberChat];
        case 'webchat':
          return [webChat, webchatView, webchatAlternativeChannels];
        default:
          return [];
      }
    },

    chatGatewayTitle() {
      return this.$t(`objects.routing.chatGateways.${this.chatType}`)
                 .concat(' ', this.$tc('objects.routing.gateways.gateways', 1));
    },

    path() {
      const baseUrl = '/routing/chat-gateways';
      const url = baseUrl.concat(`/${this.chatType}`);
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$tc('objects.routing.chatGateways.chatGateways', 2), route: baseUrl },
        {
          name: `${(this.id ? this.pathName : this.$t('objects.new'))} ${this.chatGatewayTitle}`,
          route: this.id ? `${url}/${this.id}` : `${url}/new`,
        },
      ];
    },

    isWebchat() {
      return this.chatType === 'webchat';
    },
  },
  methods: {
    async loadPageData() {
      await this.setId(this.$route.params.id);
      return this.loadItem(this.chatType.toUpperCase());
    },
  },
};
</script>
