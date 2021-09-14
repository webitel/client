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
import OpenedChatInfobip from './opened-chat-gateway-infobip-general-tab.vue';
import OpenedViewWebchat from './opened-chat-gateway-webchat-view-tab.vue';
import OpenedWebchat from './opened-chat-gateway-webchat-general-tab.vue';
import OpenedViberChat from './opened-chat-gateway-viber-general-tab.vue';

export default {
  name: 'opened-chat-gateway',
  mixins: [openedObjectMixin],
  components: {
    OpenedChatTelegram,
    OpenedChatFacebook,
    OpenedChatInfobip,
    OpenedWebchat,
    OpenedViberChat,
    OpenedViewWebchat,
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
        text: this.$t('objects.routing.chatGateways.webchat'),
        value: 'OpenedWebchat',
      };
      const webchatView = {
        text: this.$t('objects.routing.chatGateways.metadata.view'),
        value: 'OpenedViewWebchat',
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
          return [webChat, webchatView];
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
