<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <headline-nav :path="path"></headline-nav>
        <template slot="actions">
          <webchat-copy-code-button
            v-if="isWebchat"
            :item-instance="itemInstance"
            @copied="handleWebchatCodeCopied"
          ></webchat-copy-code-button>
        </template>
      </object-header>
    </template>

    <template v-slot:main>
      <div class="main-container">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="$v"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { maxValue, minLength, minValue, numeric, required, url } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

import OpenedChatMessenger from './messenger/opened-chat-gateway-messenger-general-tab.vue';
import OpenedChatFacebook from '../modules/messenger/facebook/components/facebook-tab.vue';
import OpenedChatInstagram from '../modules/messenger/instagram/components/instagram-tab.vue';

import OpenedChatInfobip from './infobip/opened-chat-gateway-infobip-general-tab.vue';
import OpenedChatTelegram from './telegram/opened-chat-gateway-telegram-general-tab.vue';
import OpenedViberChat from './viber/opened-chat-gateway-viber-general-tab.vue';
import WebchatCopyCodeButton from './webchat/copy-code-button.vue';

import OpenedWebchat from './webchat/opened-chat-gateway-webchat-general-tab.vue';
import OpenedWebchatAlternativeChannels from './webchat/opened-chat-gateway-webchat-alternative-channels-tab.vue';
import OpenedWebchatView from './webchat/opened-chat-gateway-webchat-view-tab.vue';

export default {
  name: 'opened-chat-gateway',
  mixins: [openedObjectMixin],
  components: {
    OpenedChatTelegram,
    OpenedChatMessenger,
    OpenedChatFacebook,
    OpenedChatInstagram,
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
      case 'messenger':
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              clientId: { required },
              clientSecret: { required },
            },
          },
        };
      case 'infobip':
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              apiKey: { required },
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
      if (this.$route.path.includes('messenger')) {
        return 'messenger';
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
        text: this.$t('objects.routing.chatGateways.telegram.telegram'),
        value: 'OpenedChatTelegram',
      };

      const messengerChat = {
        text: this.$t('objects.routing.chatGateways.messenger.messenger'),
        value: 'OpenedChatMessenger',
      };
      const facebookChatPages = {
        text: this.$t('objects.routing.chatGateways.messenger.facebook.pages'),
        value: 'OpenedChatFacebook',
      };
      const instagramChatPages = {
        text: this.$t('objects.routing.chatGateways.messenger.instagram.instagram'),
        value: 'OpenedChatInstagram',
      };
      const messenger = this.id ? [
        messengerChat,
        facebookChatPages,
        instagramChatPages,
      ] : [messengerChat];

      const infobipChat = {
        text: this.$t('objects.routing.chatGateways.infobip.infobip'),
        value: 'OpenedChatInfobip',
      };

      const viberChat = {
        text: this.$t('objects.routing.chatGateways.viber.viber'),
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
        text: this.$t('objects.routing.chatGateways.webchat.alternativeChannels.alternativeChannels'),
        value: 'OpenedWebchatAlternativeChannels',
      };

      switch (this.chatType) {
        case 'telegram':
          return [telegramChat];
        case 'messenger':
          return messenger;
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
      return this.$t(`objects.routing.chatGateways.${this.chatType}.${this.chatType}`)
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
    ...mapActions({
                    handleWebchatCodeCopied(dispatch, payload) {
                      return dispatch(`${this.namespace}/RESET_WEBCHAT_COPY_DIRTY_FLAG`, payload);
                    },
                  }),
    async loadPageData() {
      await this.setId(this.$route.params.id);
      return this.loadItem(this.chatType.toUpperCase());
    },
  },
};
</script>
