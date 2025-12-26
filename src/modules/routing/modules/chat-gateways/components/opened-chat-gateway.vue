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
        <wt-breadcrumb :path="path" />
        <template #actions>
          <webchat-copy-code-button
            v-if="isWebchat"
            :item-instance="itemInstance"
            :namespace="namespace"
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
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
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
import { maxValue, minLength, minValue, numeric, required, requiredIf, url } from '@vuelidate/validators';
import ChatGatewayProvider from '@webitel/ui-sdk/src/enums/ChatGatewayProvider/ChatGatewayProvider.enum';
import websocketValidator from '@webitel/ui-sdk/src/validators/websocketValidator/websocketValidator';
import { mapActions } from 'vuex';

import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import OpenedChatFacebook from '../modules/messenger/facebook/components/facebook-tab.vue';
import OpenedChatInstagram from '../modules/messenger/instagram/components/instagram-tab.vue';
import OpenedChatWhatsapp from '../modules/messenger/whatsapp/components/whatsapp-tab.vue';
import WebchatCopyCodeButton from '../modules/webchat/components/copy-code-button.vue';
import OpenedWebchatAlternativeChannels from '../modules/webchat/components/opened-chat-gateway-webchat-alternative-channels-tab.vue';
import OpenedWebchatAppointment from '../modules/webchat/components/opened-chat-gateway-webchat-appointment-tab.vue';
import OpenedWebchatChat from '../modules/webchat/components/opened-chat-gateway-webchat-chat-tab.vue';
import OpenedWebchat from '../modules/webchat/components/opened-chat-gateway-webchat-general-tab.vue';
import OpenedChatGatewayWebchatRecaptchaTab from '../modules/webchat/components/opened-chat-gateway-webchat-recaptcha-tab.vue';
import OpenedWebchatView from '../modules/webchat/components/opened-chat-gateway-webchat-view-tab.vue';
import ChatGatewayRoutesName from '../router/_internals/ChatGatewayRouteNames.enum.js';
import OpenedChatGatewayTemplates from './_shared/opened-chat-gateway-templates-tab.vue';
import OpenedChatCustom from './custom/opened-chat-gateway-custom-general-tab.vue';
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
    OpenedChatGatewayWebchatRecaptchaTab,
    OpenedChatCustom,
  },
  mixins: [openedObjectMixin],
  setup: () => ({
    v$: useVuelidate(),
  }),

  data: () => ({
    namespace: 'routing/chatGateways',
    routeName: RouteNames.CHAT_GATEWAYS,
  }),
  validations() {
    const defaults = {
      name: { required },
      uri: {
        required,
        minLength: minLength(3),
      },
      flow: {
        name: {
          required,
        },
      },
    };
    switch (this.chatType) {
      case ChatGatewayProvider.TELEGRAM_BOT:
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              token: {
                required,
              },
            },
          },
        };
      case ChatGatewayProvider.TELEGRAM_APP:
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              apiId: {
                required,
                numeric,
              },
              apiHash: {
                required,
              },
            },
          },
        };
      case ChatGatewayProvider.MESSENGER:
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              clientId: {
                required,
              },
              clientSecret: {
                required,
              },
              version: {
                valid: (value) => !value || /^v([1-9]\d*)(\.(0|[1-9]\d*))$/.test(value),
              },
            },
          },
        };
      case ChatGatewayProvider.INFOBIP:
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              apiKey: {
                required,
              },
              url: {
                required,
                url,
              },
            },
          },
        };
      case ChatGatewayProvider.WEBCHAT:
        return {
          itemInstance: {
            ...defaults,
            flow: {
              required: requiredIf(() => {
                return this.itemInstance.metadata.chat.enabled
              })
            },
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
              view: {
                logoUrl: {
                  url,
                },
              },
              captcha: this.itemInstance.metadata.captcha.enabled
                ? {
                    sitekey: {
                      required,
                    },
                    secret: {
                      required,
                    },
                    threshold: {
                      required,
                      numeric,
                      minValue: minValue(0),
                      maxValue: maxValue(1),
                    },
                  }
                : {},
              chat: {
                openTimeout: {
                  numeric,
                  minValue: minValue(0),
                },
              },
              appointment: this.itemInstance.metadata.appointment.enabled
                ? {
                    queue: {
                      required,
                    },
                    communicationType: {
                      required,
                    },
                    duration: {
                      required,
                    },
                    days: {
                      required,
                      minValue: minValue(1),
                      maxValue: maxValue(7),
                    },
                    availableAgents: {
                      required,
                      minValue: minValue(1),
                    },
                  }
                : {},
              call: this.itemInstance.metadata.call.enabled
                ? {
                    url: {
                      required,
                      websocketValidator,
                    },
                    flow: {
                      required,
                    },
                  }
                : {},
            },
          },
        };
      case ChatGatewayProvider.VIBER:
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              token: {
                required,
              },
            },
          },
        };
      case ChatGatewayProvider.CUSTOM:
        return {
          itemInstance: {
            ...defaults,
            metadata: {
              webhook: {
                required,
              },
              secret: {
                required,
              },
            },
          },
        };
      default:
        return {
          itemInstance: {
            ...defaults,
          },
        };
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
        pathName: ChatGatewayRoutesName.GENERAL,
      };
      const botTemplates = {
        text: this.$tc('objects.routing.chatGateways.templates.templates', 2),
        value: 'OpenedChatGatewayTemplates',
        pathName: ChatGatewayRoutesName.TEMPLATES,
      };
      const telegramAppChat = {
        text: this.$t('objects.routing.chatGateways.telegramApp.telegramApp'),
        value: 'OpenedChatTelegramApp',
        pathName: ChatGatewayRoutesName.GENERAL,
      };
      const messengerChat = {
        text: this.$t('objects.routing.chatGateways.messenger.meta'),
        value: 'OpenedChatMessenger',
        pathName: ChatGatewayRoutesName.GENERAL,
      };
      const facebookChatPages = {
        text: this.$t('objects.routing.chatGateways.messenger.facebook.pages'),
        value: 'OpenedChatFacebook',
        pathName: ChatGatewayRoutesName.FACEBOOK_PAGES,
      };
      const instagramChatPages = {
        text: this.$t('objects.routing.chatGateways.messenger.instagram.instagram'),
        value: 'OpenedChatInstagram',
        pathName: ChatGatewayRoutesName.INSTAGRAM,
      };
      const whatsappChatPages = {
        text: this.$t('objects.routing.chatGateways.messenger.whatsapp.whatsapp'),
        value: 'OpenedChatWhatsapp',
        pathName: ChatGatewayRoutesName.WHATSAPP,
      };
      const messenger = this.id
        ? [messengerChat, facebookChatPages, instagramChatPages, whatsappChatPages]
        : [messengerChat];
      messenger.push(botTemplates);

      const infobipChat = {
        text: this.$t('objects.routing.chatGateways.infobip.infobip'),
        value: 'OpenedChatInfobip',
        pathName: ChatGatewayRoutesName.GENERAL,
      };

      const customChatPages = {
        text: this.$t('objects.general'),
        value: 'OpenedChatCustom',
        pathName: ChatGatewayRoutesName.GENERAL,
      };

      const viberChat = {
        text: this.$t('objects.routing.chatGateways.viber.viber'),
        value: 'OpenedViberChat',
        pathName: ChatGatewayRoutesName.GENERAL,
      };
      const viberStyle = {
        text: this.$t('objects.routing.chatGateways.viber.style.style'),
        value: 'OpenedViberChatStyle',
        pathName: ChatGatewayRoutesName.STYLE,
      };

      const webChat = {
        text: this.$t('objects.general'),
        value: 'OpenedWebchat',
        pathName: ChatGatewayRoutesName.GENERAL,
      };
      const webchatView = {
        text: this.$t('objects.routing.chatGateways.webchat.view.view'),
        value: 'OpenedWebchatView',
        pathName: ChatGatewayRoutesName.VIEW,
      };
      const webchatChat = {
        text: this.$t('objects.routing.chatGateways.webchat.chat.chat'),
        value: 'OpenedWebchatChat',
        pathName: ChatGatewayRoutesName.CHAT,
      };
      const webchatAppointment = {
        text: this.$t('objects.routing.chatGateways.webchat.appointment.appointment'),
        value: 'OpenedWebchatAppointment',
        pathName: ChatGatewayRoutesName.APPOINTMENT,
      };
      const webchatAlternativeChannels = {
        text: this.$t(
          'objects.routing.chatGateways.webchat.alternativeChannels.alternativeChannels',
        ),
        value: 'OpenedWebchatAlternativeChannels',
        pathName: ChatGatewayRoutesName.ALTERNATIVE_CHANNELS,
      };
      const webchatReCaptcha = {
        text: this.$t('objects.routing.chatGateways.webchat.recaptcha.recaptcha'),
        value: 'OpenedChatGatewayWebchatRecaptchaTab',
        pathName: ChatGatewayRoutesName.RE_CAPTCHA,
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
        case ChatGatewayProvider.CUSTOM:
          return [customChatPages, botTemplates];
        case ChatGatewayProvider.WEBCHAT:
          return [
            webChat,
            webchatView,
            webchatChat,
            webchatAppointment,
            webchatAlternativeChannels,
            botTemplates,
            webchatReCaptcha,
          ];
        default:
          return [{pathName: ChatGatewayRoutesName.GENERAL}];
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
        case ChatGatewayProvider.CUSTOM:
          chatTypeLocale = 'customChat.customChat';
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
      return this.$t(`objects.routing.chatGateways.${chatTypeLocale}`);
    },

    path() {
      const baseUrl = '/routing/chat-gateways';
      return [
        {
          name: this.$t('objects.routing.routing'),
        },
        {
          name: this.$tc('objects.routing.chatGateways.chatGateways', 2),
          route: baseUrl,
        },
        {
          name: `${this.id ? this.pathName : this.$t('objects.new')} ${this.chatGatewayTitle}`,
          route: {
            name: this.currentTab.pathName,
            query: this.$route.query,
          },
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
    },
    changeTab(tab) {
      this.$router.push({ name: tab.pathName ,query: this.$route.query });
    },
  },
};
</script>
