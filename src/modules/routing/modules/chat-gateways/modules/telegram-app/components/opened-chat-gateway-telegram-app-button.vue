<template>
  <div class="opened-chat-gateway-telegram-app-button">
    <p v-if="isAuthorized">
      {{ t('objects.routing.chatGateways.telegramApp.signedAs') }}
      {{ state.account?.FirstName }} {{ state.account?.LastName }}
    </p>
    <wt-button
      :color="isAuthorized ? ButtonColor.SECONDARY : ButtonColor.PRIMARY"
      @click="handleButtonClick"
    >
      {{ btnText }}
    </wt-button>
  </div>
</template>

<script setup lang="ts">
import {
	type ChatGatewayChannelParams,
	ChatGatewayChannelSetup,
	ChatGatewayChannelsAPI,
	type TelegramAppAuthState,
} from '@webitel/api-services/api';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { getAppUrls } from '../../../../../../../app/api/getAppUrls';
import openMessengerWindow from '../../../scripts/openMessengerWindow';

const props = defineProps<{
	uri: string;
}>();

const { t } = useI18n();

const channelParams = (): ChatGatewayChannelParams => ({
	uri: props.uri,
	appUrls: getAppUrls(),
});

const state = ref<TelegramAppAuthState>({});

const isAuthorized = computed(() => !!state.value.authorized);

const btnText = computed(() =>
	isAuthorized.value
		? t('objects.routing.chatGateways.telegramApp.signOut')
		: t('objects.routing.chatGateways.telegramApp.joinTelegram'),
);

const loadAuth = async () => {
	state.value = await ChatGatewayChannelsAPI.getTelegramAppAuth(
		channelParams(),
	);
};

const handleButtonClick = async () => {
	if (isAuthorized.value) {
		try {
			await ChatGatewayChannelsAPI.logoutTelegramApp(channelParams());
		} finally {
			await loadAuth();
		}
	} else {
		openMessengerWindow({
			url: ChatGatewayChannelsAPI.getSetupUrl({
				...channelParams(),
				setup: ChatGatewayChannelSetup.TELEGRAM_APP,
			}),
			listener: ({ data }) => {
				if (data.status === 'success') loadAuth();
			},
		});
	}
};

loadAuth();
</script>

<style scoped>
.opened-chat-gateway-telegram-app-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
