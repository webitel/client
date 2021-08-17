<template>

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
        icon: 'telegram',
      };
      const whatsapp = {
        value: 'whatsapp',
        title: this.$t('objects.routing.chatGateways.whatsapp'),
        icon: 'whatsapp',
      };
      const facebook = {
        value: 'facebook',
        title: this.$t('objects.routing.chatGateways.facebook'),
        icon: 'facebook',
      };
      const viber = {
        value: 'viber',
        title: this.$t('objects.routing.chatGateways.viber'),
        icon: 'viber',
      };
      const webchat = {
        value: 'webchat',
        title: this.$t('objects.routing.chatGateways.webchat'),
        icon: 'web-chat',
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
        this.$router.push({ name: `${RouteNames.GATEWAYS}-${this.selected.value}-new` });
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

</style>
