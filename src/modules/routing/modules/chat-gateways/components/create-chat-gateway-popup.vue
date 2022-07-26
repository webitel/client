<template>
  <selection-popup
    :options="options"
    :selected="selected"
    :title="$t('objects.routing.chatGateways.newChatGateway')"
    @change="selectOption"
    @close="close"
    @select="createGateway"
  ></selection-popup>
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
      const telegram = {
        value: ChatGatewayProvider.TELEGRAM_BOT,
        title: this.$t('objects.routing.chatGateways.telegramBot.telegramBot'),
        icon: 'messenger-telegram',
      };
      const infobip = {
        value: ChatGatewayProvider.INFOBIP,
        title: this.$t('objects.routing.chatGateways.infobip.infobip'),
        icon: 'messenger-infobip',
      };
      const messenger = {
        value: ChatGatewayProvider.MESSENGER,
        title: this.$t('objects.routing.chatGateways.messenger.messenger'),
        icon: 'messenger-messenger',
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
      return [telegram, infobip, messenger, viber, webchat];
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
