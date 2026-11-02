<template>
  <wt-selection-popup
    v-bind="$attrs"
    :options="options"
    :selected="selected"
    :title="t('objects.routing.chatGateways.newChatGateway')"
    @change="selected = $event"
    @close="emit('close')"
    @add="create"
  >
    <template #option="{ option }">
      <div class="create-chat-gateway-popup__icons">
        <wt-icon
          v-for="icon of option.icons"
          :key="icon"
          :icon="icon"
          size="sm"
        />
      </div>
      <h4 class="typo-subtitle-2">
        {{ option.title }}
      </h4>
    </template>
  </wt-selection-popup>
</template>

<script setup lang="ts">
import { ChatGatewayProvider } from '@webitel/api-services/enums';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

interface ChatGatewayProviderOption {
	value: ChatGatewayProvider;
	title: string;
	icons: string[];
}

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const router = useRouter();

const options = computed<ChatGatewayProviderOption[]>(() => [
	{
		value: ChatGatewayProvider.TELEGRAM_BOT,
		title: t('objects.routing.chatGateways.telegramBot.telegramBot'),
		icons: [
			'messenger-telegram',
		],
	},
	{
		value: ChatGatewayProvider.TELEGRAM_APP,
		title: t('objects.routing.chatGateways.telegramApp.telegramApp'),
		icons: [
			'messenger-telegram',
		],
	},
	{
		value: ChatGatewayProvider.INFOBIP,
		title: t('objects.routing.chatGateways.infobip.infobip'),
		icons: [
			'messenger-infobip',
			'send-arrow',
			'messenger-whatsapp',
		],
	},
	{
		value: ChatGatewayProvider.MESSENGER,
		title: t('objects.routing.chatGateways.messenger.meta'),
		icons: [
			'meta',
			'send-arrow',
			'messenger-facebook',
			'instagram',
			'messenger-whatsapp',
		],
	},
	{
		value: ChatGatewayProvider.VIBER,
		title: t('objects.routing.chatGateways.viber.viber'),
		icons: [
			'messenger-viber',
		],
	},
	{
		value: ChatGatewayProvider.WEBCHAT,
		title: t('objects.routing.chatGateways.webchat.webchat'),
		icons: [
			'messenger-web-chat',
		],
	},
	{
		value: ChatGatewayProvider.CUSTOM,
		title: t('objects.routing.chatGateways.customChat.customChatGateway'),
		icons: [
			'custom-chat-gateway',
		],
	},
]);

const selected = ref<ChatGatewayProviderOption>(options.value[0]);

const create = () =>
	router.push({
		name: `${RouteNames.CHAT_GATEWAYS}-card`,
		params: {
			id: 'new',
		},
		query: {
			type: selected.value.value,
		},
	});
</script>

<style scoped>
.create-chat-gateway-popup__icons {
  display: flex;
  margin-right: var(--spacing-xs);
}
</style>
