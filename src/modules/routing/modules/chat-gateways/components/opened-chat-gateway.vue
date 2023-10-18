<template>
  <wt-page-wrapper
    v-if="showPage"
    :actions-panel="false"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path" />
        <template #actions>
          <webchat-copy-code-button
            v-if="isWebchat"
            :item-instance="itemInstance"
            @copied="handleWebchatCodeCopied"
          />
        </template>
      </wt-page-header>
    </template>

    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        />
        <component
          :is="currentTab.value"
          v-if="currentTab"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { maxValue, minLength, minValue, numeric, required, url } from '@vuelidate/validators';
import { mapActions } from 'vuex';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import ChatGatewayProvider from '../enum/ChatGatewayProvider.enum';
import OpenedChatFacebook from '../modules/messenger/facebook/components/facebook-tab.vue';
import OpenedChatInstagram from '../modules/messenger/instagram/components/instagram-tab.vue';
import OpenedChatWhatsapp from '../modules/messenger/whatsapp/components/whatsapp-tab.vue';
import WebchatCopyCodeButton from '../modules/webchat/components/copy-code-button.vue';
import OpenedWebchatAlternativeChannels
  from '../modules/webchat/components/opened-chat-gateway-webchat-alternative-channels-tab.vue';
import OpenedWebchatAppointment from '../modules/webchat/components/opened-chat-gateway-webchat-appointment-tab.vue';
import OpenedWebchatChat from '../modules/webchat/components/opened-chat-gateway-webchat-chat-tab.vue';

import OpenedWebchat from '../modules/webchat/components/opened-chat-gateway-webchat-general-tab.vue';
import OpenedWebchatView from '../modules/webchat/components/opened-chat-gateway-webchat-view-tab.vue';
import OpenedChatGatewayTemplates from './_shared/opened-chat-gateway-templates-tab.vue';

import OpenedChatInfobip from './infobip/opened-chat-gateway-infobip-general-tab.vue';

import OpenedChatMessenger from './messenger/opened-chat-gateway-messenger-general-tab.vue';
import OpenedChatTelegramApp from './telegram-app/opened-chat-gateway-telegram-app-general-tab.vue';
import OpenedChatTelegramBot from './telegram-bot/opened-chat-gateway-telegram-bot-general-tab.vue';

import OpenedViberChat from './viber/opened-chat-gateway-viber-general-tab.vue';
import OpenedViberChatStyle from './viber/opened-chat-gateway-viber-style-tab.vue';

export default {
  name: 'OpenedChatGateway',
  components: {
    OpenedChatGatewayTemplates,
    OpenedChatTelegramBot,
    OpenedChatTelegramApp,
    OpenedChatMessenger,
    OpenedChatFacebook,
    OpenedChatInstagram,
    OpenedChatWhatsapp,
    OpenedChatInfobip,
    OpenedViberChat,
    OpenedViberChatStyle,
    OpenedWebchat,
    OpenedWebchatView,
    OpenedWebchatAlternativeChannels,
    WebchatCopyCodeButton,
    OpenedWebchatChat,
    OpenedWebchatAppointment,
  },
  mixins: [openedObjectMixin],
  setup: () => ({
    v$: useVuelidate(),
  }),

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
              view: { logoUrl: { url } },
              chat: {
                openTimeout: {
                  numeric,
                  minValue: minValue(0),
                },
              },
              appointment: this.itemInstance.metadata.appointment.enabled ? {
                queue: { required },
                communicationType: { required },
                duration: { required },
                days: {
                  required,
                  minValue: minValue(1),
                  maxValue: maxValue(7),
                },
                availableAgents: {
                  required,
                  minValue: minValue(1),
                },
              } : {},
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
        text: this.$t('objects.routing.chatGateways.messenger.meta'),
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
      const whatsappChatPages = {
        text: this.$t('objects.routing.chatGateways.messenger.whatsapp.whatsapp'),
        value: 'OpenedChatWhatsapp',
      };
      const messenger = this.id ? [
        messengerChat,
        facebookChatPages,
        instagramChatPages,
        whatsappChatPages,
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
      const viberStyle = {
        text: this.$t('objects.routing.chatGateways.viber.style.style'),
        value: 'OpenedViberChatStyle',
      };

      const webChat = {
        text: this.$t('objects.general'),
        value: 'OpenedWebchat',
      };
      const webchatView = {
        text: this.$t('objects.routing.chatGateways.webchat.view.view'),
        value: 'OpenedWebchatView',
      };
      const webchatChat = {
        text: this.$t('objects.routing.chatGateways.webchat.chat.chat'),
        value: 'OpenedWebchatChat',
      };
      const webchatAppointment = {
        text: this.$t('objects.routing.chatGateways.webchat.appointment.appointment'),
        value: 'OpenedWebchatAppointment',
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
          return [viberChat, viberStyle, botTemplates];
        case ChatGatewayProvider.WEBCHAT:
          return [
            webChat,
            webchatView,
            webchatChat,
            webchatAppointment,
            webchatAlternativeChannels,
            botTemplates,
          ];
        default:
          return [];
      }
    },

    chatGatewayTitle() {
      let chatTypeLocale;
      switch (this.chatType) {
        case ChatGatewayProvider.INFOBIP:
          chatTypeLocale = 'infobip.infobip';
          break;
        case ChatGatewayProvider.TELEGRAM_BOT:
          chatTypeLocale = 'telegramBot.telegramBot';
          break;
        case ChatGatewayProvider.MESSENGER:
          chatTypeLocale = `${this.chatType}.meta`;
          break;
        case ChatGatewayProvider.VIBER:
        case ChatGatewayProvider.WEBCHAT:
          chatTypeLocale = `${this.chatType}.${this.chatType}`;
          break;
        default:
          return this.$tc('objects.routing.gateways.gateways', 1);
      }
      return this.$t(`objects.routing.chatGateways.${chatTypeLocale}`)
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
