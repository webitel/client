<template>
  <wt-page-wrapper v-if="showPage" :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
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
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          v-if="currentTab"
          :namespace="namespace"
          :v="$v"
        ></component>
        <input type="submit" hidden> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { maxValue, minLength, minValue, numeric, required, url } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import ChatGatewayProvider from '../enum/ChatGatewayProvider.enum';
import OpenedChatFacebook from '../modules/messenger/facebook/components/facebook-tab.vue';
import OpenedChatInstagram from '../modules/messenger/instagram/components/instagram-tab.vue';

import OpenedChatInfobip from './infobip/opened-chat-gateway-infobip-general-tab.vue';

import OpenedChatMessenger from './messenger/opened-chat-gateway-messenger-general-tab.vue';
import OpenedChatTelegramBot from './telegram-bot/opened-chat-gateway-telegram-bot-general-tab.vue';
import OpenedChatGatewayTemplates from './_shared/opened-chat-gateway-templates-tab.vue';

import OpenedViberChat from './viber/opened-chat-gateway-viber-general-tab.vue';
import WebchatCopyCodeButton from './webchat/copy-code-button.vue';
import OpenedWebchatAlternativeChannels from './webchat/opened-chat-gateway-webchat-alternative-channels-tab.vue';
import OpenedChatTelegramApp from './telegram-app/opened-chat-gateway-telegram-app-general-tab.vue';

import OpenedWebchat from './webchat/opened-chat-gateway-webchat-general-tab.vue';
import OpenedWebchatView from './webchat/opened-chat-gateway-webchat-view-tab.vue';

export default {
  name: 'opened-chat-gateway',
  mixins: [openedObjectMixin],
  components: {
    OpenedChatGatewayTemplates,
    OpenedChatTelegramBot,
    OpenedChatTelegramApp,
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
      case ChatGatewayProvider.TELEGRAM_BOT:
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              token: { required },
            },
          },
        };
      case ChatGatewayProvider.TELEGRAM_APP:
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              apiId: { required, numeric },
              apiHash: { required },
            },
          },
        };
      case ChatGatewayProvider.MESSENGER:
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              clientId: { required },
              clientSecret: { required },
            },
          },
        };
      case ChatGatewayProvider.INFOBIP:
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              apiKey: { required },
              url: { required, url },
            },
          },
        };
      case ChatGatewayProvider.WEBCHAT:
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
      case ChatGatewayProvider.VIBER:
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
    showPage() {
      return this.itemInstance.provider !== null;
    },
    chatType() {
      return this.itemInstance.provider;
    },

    tabs() {
      const telegramBotChat = {
        text: this.$t('objects.routing.chatGateways.telegramBot.telegramBot'),
        value: 'OpenedChatTelegramBot',
      };
      const botTemplates = {
        text: this.$t('objects.routing.chatGateways.templates.templates'),
        value: 'OpenedChatGatewayTemplates',
      };
      const telegramAppChat = {
        text: this.$t('objects.routing.chatGateways.telegramApp.telegramApp'),
        value: 'OpenedChatTelegramApp',
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
      messenger.push(botTemplates);

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
        case ChatGatewayProvider.TELEGRAM_BOT:
          return [telegramBotChat, botTemplates];
        case ChatGatewayProvider.TELEGRAM_APP:
          return [telegramAppChat, botTemplates];
        case ChatGatewayProvider.MESSENGER:
          return messenger;
        case ChatGatewayProvider.INFOBIP:
          return [infobipChat, botTemplates];
        case ChatGatewayProvider.VIBER:
          return [viberChat, botTemplates];
        case ChatGatewayProvider.WEBCHAT:
          return [webChat, webchatView, webchatAlternativeChannels, botTemplates];
        default:
          return [];
      }
    },

    chatGatewayTitle() {
      let chatTypeLocale;
      switch (this.chatType) {
        case ChatGatewayProvider.INFOBIP:
          chatTypeLocale = 'infobip';
          break;
        case ChatGatewayProvider.TELEGRAM_BOT:
          chatTypeLocale = 'telegramBot';
          break;
          case ChatGatewayProvider.MESSENGER:
        case ChatGatewayProvider.VIBER:
        case ChatGatewayProvider.WEBCHAT:
          chatTypeLocale = this.chatType;
          break;
        default:
          return this.$tc('objects.routing.gateways.gateways', 1);
      }
      return this.$t(`objects.routing.chatGateways.${chatTypeLocale}.${chatTypeLocale}`)
      .concat(' ', this.$tc('objects.routing.gateways.gateways', 1));
    },

    path() {
      const baseUrl = '/routing/chat-gateways';
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$tc('objects.routing.chatGateways.chatGateways', 2), route: baseUrl },
        {
          name: `${(this.id ? this.pathName : this.$t('objects.new'))} ${this.chatGatewayTitle}`,
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },

    isWebchat() {
      return this.chatType === ChatGatewayProvider.WEBCHAT;
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
      await this.loadItem(this.$route.query.type);
      this.setInitialTab();
    },
  },
};
</script>
