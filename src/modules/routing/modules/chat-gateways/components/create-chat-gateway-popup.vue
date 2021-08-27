<template>
  <selection-popup
    :title="$t('objects.routing.chatGateways.newChatGateway')"
    :options="options"
    :selected="selected"
    @change="selectOption"
    @select="createGateway"
    @close="close"
  ></selection-popup>
</template>

<script>
import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'create-chat-gateway-popup',
  components: { SelectionPopup },

  data: () => ({
    selected: null,
  }),
  computed: {
    options() {
      const telegram = {
        value: 'telegram',
        title: this.$t('objects.routing.chatGateways.telegram'),
        icon: 'messenger-telegram',
      };
      const whatsapp = {
        value: 'infobip-whatsapp',
        title: this.$t('objects.routing.chatGateways.whatsapp'),
        icon: 'messenger-whatsapp',
      };
      const facebook = {
        value: 'facebook',
        title: this.$t('objects.routing.chatGateways.facebook'),
        icon: 'messenger-facebook',
      };
      const viber = {
        value: 'viber',
        title: this.$t('objects.routing.chatGateways.viber'),
        icon: 'messenger-viber',
      };
      const webchat = {
        value: 'webchat',
        title: this.$t('objects.routing.chatGateways.webchat'),
        icon: 'messenger-web-chat',
      };
      return [telegram, whatsapp, facebook, viber, webchat];
    },
  },

  methods: {
    selectOption(option) {
      this.selected = option;
    },
    createGateway() {
      if (this.selected) {
        this.$router.push({ name: `${RouteNames.CHAT_GATEWAYS}-${this.selected.value}-new` });
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
