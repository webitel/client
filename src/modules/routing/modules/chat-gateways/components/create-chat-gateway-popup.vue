<template>
  <selection-popup v-bind="$attrs" :options="options" :selected="selected"
    :title="$t('objects.routing.chatGateways.newChatGateway')" @change="selectOption" @close="close"
    @select="createGateway">
    <template #option="{ option }">
      <wt-icon v-if="option.icon && !Array.isArray(option.icon)" :icon="option.icon" size="sm" />
      <div v-if="Array.isArray(option.icon)" class="popup-options__icons-wrap">
        <wt-icon v-for="(icon, key) of option.icon" :key="key" :icon="icon" size="sm" />
      </div>
      <h4 class="popup-options__item-header typo-subtitle-2">
        {{ option.title }}
      </h4>
    </template>
  </selection-popup>
</template>

<script>
import ChatGatewayProvider from '@webitel/ui-sdk/src/enums/ChatGatewayProvider/ChatGatewayProvider.enum';

import SelectionPopup from '../../../../../app/components/utils/selection-popup/selection-popup.vue';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'CreateChatGatewayPopup',
  components: { SelectionPopup },

  data: () => ({
    selected: {},
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
        title: this.$t('objects.routing.chatGateways.messenger.meta'),
        icon: ['meta', 'send-arrow', 'messenger-facebook', 'instagram', 'messenger-whatsapp'],
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
      const custom = {
        value: ChatGatewayProvider.CUSTOM,
        title: this.$t('objects.routing.chatGateways.customChat.customChatGateway'),
        icon: 'custom-chat-gateway',
      };
      return [telegramBot, telegramApp, infobip, messenger, viber, webchat, custom];
    },
  },

  created() {
    this.selectOption(this.options[0]);
  },
  methods: {
    selectOption(option) {
      this.selected = option;
    },
    createGateway() {
      this.$router.push({
        name: `${RouteNames.CHAT_GATEWAYS}-card`,
        params: { id: 'new' },
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
@use '@webitel/ui-sdk/src/css/main' as *;

.selection-popup {
  .popup-options__item-wrap {
    .wt-icon {
      margin-right: var(--spacing-xs);
    }
  }


  .popup-options__icons-wrap {
    display: flex;
  }

}
</style>
