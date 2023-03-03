<template>
  <selection-popup
    :options="options"
    :selected="selected"
    :title="$t('objects.routing.chatGateways.newChatGateway')"
    @close="close"
    @select="createGateway"
  >
    <template #main>
      <ul class="popup-options">
        <li
          v-for="(option, key) of options"
          :key="key"
          :class="{'active': option === selected}"
          class="popup-options__item-wrap"
          @click="selectOption(option)"
        >
          <wt-icon
            v-if="option.icon && !Array.isArray(option.icon)" :icon="option.icon" size="sm"
          ></wt-icon>
          <div
            v-if="Array.isArray(option.icon)"
            class="popup-options__icons-wrap"
          >
            <wt-icon
              v-for="(icon, key) of option.icon"
              :icon="icon"
              :key="key"
              size="sm"
            ></wt-icon>
          </div>
          <h4 class="popup-options__item-header">{{ option.title }}</h4>
        </li>
      </ul>
    </template>
  </selection-popup>
</template>

<script>
import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import ChatGatewayProvider from '../enum/ChatGatewayProvider.enum';

export default {
  name: 'create-chat-gateway-popup',
  components: { SelectionPopup },

  data: () => ({
    selected: null,
  }),
  computed: {
    options() {
      const telegramBot = {
        value: ChatGatewayProvider.TELEGRAM_BOT,
        title: this.$t('objects.routing.chatGateways.telegramBot.telegramBot'),
        icon: 'messenger-telegram',
      };
      const telegramApp = {
        value: ChatGatewayProvider.TELEGRAM_APP,
        title: this.$t('objects.routing.chatGateways.telegramApp.telegramApp'),
        icon: 'messenger-telegram',
      };
      const infobip = {
        value: ChatGatewayProvider.INFOBIP,
        title: this.$t('objects.routing.chatGateways.infobip.infobip'),
        icon: ['messenger-infobip', 'send-arrow', 'messenger-whatsapp'],
      };
      const messenger = {
        value: ChatGatewayProvider.MESSENGER,
        title: this.$t('objects.routing.chatGateways.messenger.messenger'),
        icon: ['messenger-messenger', 'send-arrow', 'messenger-facebook', 'instagram', 'messenger-whatsapp'],
      };
      const viber = {
        value: ChatGatewayProvider.VIBER,
        title: this.$t('objects.routing.chatGateways.viber.viber'),
        icon: 'messenger-viber',
      };
      const webchat = {
        value: ChatGatewayProvider.WEBCHAT,
        title: this.$t('objects.routing.chatGateways.webchat.webchat'),
        icon: 'messenger-web-chat',
      };
      return [telegramBot, telegramApp, infobip, messenger, viber, webchat];
    },
  },

  methods: {
    selectOption(option) {
      this.selected = option;
    },
    createGateway() {
      this.$router.push({
        name: `${RouteNames.CHAT_GATEWAYS}-new`,
        query: { type: this.selected.value },
      });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import './src/app/css/objects/selection-popup.scss';

.selection-popup .popup-options {
  margin-top: 0;
  padding-right: 0;

  &__icons-wrap {
    display: flex;
  }
}
</style>
