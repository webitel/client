<template>
  <selection-popup
    :options="options"
    :selected="selected"
    :title="$t('objects.routing.chatGateways.newChatGateway')"
    @change="selectOption"
    @close="close"
    @select="createGateway"
  >
    <template v-slot:option="props">
          <wt-icon
            v-if="props.option.icon && !Array.isArray(props.option.icon)"
            :icon="props.option.icon"
            size="sm"
          ></wt-icon>
          <div
            v-if="Array.isArray(props.option.icon)"
            class="popup-options__icons-wrap"
          >
            <wt-icon
              v-for="(icon, key) of props.option.icon"
              :icon="icon"
              :key="key"
              size="sm"
            ></wt-icon>
          </div>
          <h4 class="popup-options__item-header">{{ props.option.title }}</h4>
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

.selection-popup {
  .popup-options__item-wrap {
    .wt-icon {
      margin-right: var(--spacing-xs);
    }
  }

  .popup-options__item-header {
    @extend %typo-subtitle-2;
  }

  .popup-options__icons-wrap {
      display: flex;
  }

}

</style>
