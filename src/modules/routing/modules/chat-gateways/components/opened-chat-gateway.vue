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

import { required, minValue, maxValue } from 'vuelidate/lib/validators';
import openedObjectMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import OpenedChatTelegram from './opened-chat-gateway-telegram-general-tab.vue';
import OpenedChatFacebook from './opened-chat-gateway-facebook-general-tab.vue';
import OpenedChatWhatsapp from './opened-chat-gateway-infobip-whatsapp-general-tab.vue';
import OpenedWebchat from './opened-chat-gateway-webchat-general-tab.vue';
import OpenedViberChat from './opened-chat-gateway-viber-general-tab.vue';

export default {
  name: 'opened-chat-gateway',
  mixins: [openedObjectMixin],
  components: {
    OpenedChatTelegram,
    OpenedChatFacebook,
    OpenedChatWhatsapp,
    OpenedWebchat,
    OpenedViberChat,
  },

  data: () => ({
    namespace: 'routing/chatGateways',
  }),

  validations() {
    const defaults = {
      name: { required },
      uri: { required },
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
      case 'whatsapp':
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
              allowOrigin: {},
              readTimeout: {
                minValue: minValue(30),
                maxValue: maxValue(300),
              },
              writeTimeout: {
                minValue: minValue(1),
                maxValue: maxValue(60),
              },
              handshakeTimeout: {
                minValue: minValue(10),
                maxValue: maxValue(60),
              },
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
      if (this.$route.path.includes('whatsapp')) {
        return 'whatsapp';
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
      const infobipWhatsappChat = {
        text: this.$t('objects.routing.chatGateways.whatsapp'),
        value: 'OpenedChatWhatsapp',
      };
      const viberChat = {
        text: this.$t('objects.routing.chatGateways.viber'),
        value: 'OpenedViberChat',
      };
      const webChat = {
        text: this.$t('objects.routing.chatGateways.webchat'),
        value: 'OpenedWebchat',
      };
      switch (this.chatType) {
        case 'telegram':
          return [telegramChat];
        case 'facebook':
          return [facebookChat];
        case 'whatsapp':
          return [infobipWhatsappChat];
        case 'viber':
          return [viberChat];
        case 'webchat':
          return [webChat];
        default:
          return [];
      }
    },

    chatGatewayTitle() {
      const type = this.chatType;
      return this.$t(`objects.routing.chatGateways.${type}`).concat(' ', this.$tc('objects.routing.gateways.gateways', 1));
    },

    path() {
      const baseUrl = '/routing/chat-gateways';
      const url = baseUrl.concat(this.chatType);
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$tc('objects.routing.chatGateways.chatGateways', 2), route: baseUrl },
        {
          name: `${(this.id ? this.pathName : this.$t('objects.new'))} ${this.chatGatewayTitle}`,
          route: this.id ? `${url}/${this.id}` : `${url}/new`,
        },
      ];
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
