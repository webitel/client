<template>
  <wt-page-wrapper :actions-panel="false">
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
          <opened-chat-gateway-webchat-copy-code-button
            v-if="isWebchat"
            :item-instance="modelValue"
            @copied="modelValue.metadata._btnCodeDirty = false"
          />
        </template>
      </wt-page-header>
    </template>

    <template #main>
      <wt-loader v-if="debouncedIsLoading" />
      <form
        v-else-if="provider"
        class="opened-card-form"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            v-model="modelValue"
            :validation-fields="validationFields"
          />
        </router-view>
        <input
          hidden
          type="submit"
        >
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { getChatGatewayDefaults } from '@webitel/api-services/api';
import { ChatGatewayProvider } from '@webitel/api-services/enums';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import {
	type CardTab,
	useCardComponent,
	useCardTabs,
} from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import OpenedChatGatewayWebchatCopyCodeButton from '../modules/webchat/components/opened-chat-gateway-webchat-copy-code-button.vue';
import ChatGatewayRouteNames from '../router/_internals/ChatGatewayRouteNames.enum';
import { useChatGatewayCardStore } from '../stores/card/chatGatewayCardStore';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { hasSaveActionAccess } = useUserAccessControl();

const chatGatewayCardStore = useChatGatewayCardStore();
const { draftItemInstance } = storeToRefs(chatGatewayCardStore);

/** [Claude] a new gateway is seeded with the defaults of the provider chosen in the create popup */
const setNewGatewayDefaults = () => {
	if (route.params.id !== 'new') return;
	draftItemInstance.value = getChatGatewayDefaults(
		route.query.type as string | undefined,
	);
};

setNewGatewayDefaults();

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	disabledSave,
	validationFields,
	save,
} = useCardComponent<ChatGatewayCard>({
	useCardStore: useChatGatewayCardStore,
	hasSaveAccess: hasSaveActionAccess,
});

const provider = computed(() => modelValue.value.provider);
const isWebchat = computed(
	() => provider.value === ChatGatewayProvider.WEBCHAT,
);

/**
 * [Claude] Any webchat setting change highlights the "copy code" button, as the
 * widget code on the client's site is now outdated. A replaced item (load, save)
 * is not a change, and neither is the flag itself.
 */
watch(
	[
		() => modelValue.value,
		() =>
			JSON.stringify({
				...modelValue.value.metadata,
				_btnCodeDirty: undefined,
			}),
	],
	([item, metadata], [prevItem, prevMetadata]) => {
		if (!isWebchat.value || item !== prevItem || metadata === prevMetadata) {
			return;
		}
		item.metadata._btnCodeDirty = true;
	},
);

const tabs = computed(() => {
	const tab = (text: string, pathName: string): CardTab => ({
		text,
		value: pathName,
		pathName,
	});

	const templates = tab(
		t('objects.routing.chatGateways.templates.templates', 2),
		ChatGatewayRouteNames.TEMPLATES,
	);

	switch (provider.value) {
		case ChatGatewayProvider.TELEGRAM_BOT:
			return [
				tab(
					t('objects.routing.chatGateways.telegramBot.telegramBot'),
					ChatGatewayRouteNames.TELEGRAM_BOT,
				),
				templates,
			];
		case ChatGatewayProvider.TELEGRAM_APP:
			return [
				tab(
					t('objects.routing.chatGateways.telegramApp.telegramApp'),
					ChatGatewayRouteNames.TELEGRAM_APP,
				),
				templates,
			];
		case ChatGatewayProvider.INFOBIP:
			return [
				tab(
					t('objects.routing.chatGateways.infobip.infobip'),
					ChatGatewayRouteNames.INFOBIP,
				),
				templates,
			];
		case ChatGatewayProvider.MESSENGER:
			return [
				tab(
					t('objects.routing.chatGateways.messenger.meta'),
					ChatGatewayRouteNames.META,
				),
				// [Claude] the pages and accounts are connected through the saved gateway's uri
				...(isNew.value
					? []
					: [
							tab(
								t('objects.routing.chatGateways.messenger.facebook.pages'),
								ChatGatewayRouteNames.FACEBOOK_PAGES,
							),
							tab(
								t('objects.routing.chatGateways.messenger.instagram.instagram'),
								ChatGatewayRouteNames.INSTAGRAM,
							),
							tab(
								t('objects.routing.chatGateways.messenger.whatsapp.whatsapp'),
								ChatGatewayRouteNames.WHATSAPP,
							),
						]),
				templates,
			];
		case ChatGatewayProvider.VIBER:
			return [
				tab(
					t('objects.routing.chatGateways.viber.viber'),
					ChatGatewayRouteNames.VIBER,
				),
				tab(
					t('objects.routing.chatGateways.viber.style.style'),
					ChatGatewayRouteNames.STYLE,
				),
				templates,
			];
		case ChatGatewayProvider.WEBCHAT:
			return [
				tab(
					t('objects.routing.chatGateways.webchat.webchat'),
					ChatGatewayRouteNames.WEBCHAT,
				),
				tab(
					t('objects.routing.chatGateways.webchat.view.view'),
					ChatGatewayRouteNames.VIEW,
				),
				tab(
					t('objects.routing.chatGateways.webchat.chat.chat'),
					ChatGatewayRouteNames.CHAT,
				),
				tab(
					t('objects.routing.chatGateways.webchat.appointment.appointment'),
					ChatGatewayRouteNames.APPOINTMENT,
				),
				tab(
					t(
						'objects.routing.chatGateways.webchat.alternativeChannels.alternativeChannels',
					),
					ChatGatewayRouteNames.ALTERNATIVE_CHANNELS,
				),
				templates,
				tab(
					t('objects.routing.chatGateways.webchat.recaptcha.recaptcha'),
					ChatGatewayRouteNames.RE_CAPTCHA,
				),
			];
		case ChatGatewayProvider.CUSTOM:
			return [
				tab(
					t('objects.routing.chatGateways.customChat.customChat'),
					ChatGatewayRouteNames.CUSTOM,
				),
				templates,
			];
		default:
			return [];
	}
});

const { currentTab, changeTab } = useCardTabs(tabs);

/** [Claude] the card url has no tab until the provider, and with it the first tab, is known */
watch(
	() => tabs.value[0],
	(firstTab) => {
		if (firstTab && route.name === `${RouteNames.CHAT_GATEWAYS}-card`) {
			router.replace({
				name: firstTab.pathName,
				params: route.params,
				query: route.query,
			});
		}
	},
	{
		immediate: true,
	},
);
const { close } = useClose(RouteNames.CHAT_GATEWAYS);

const providerTitleLocale: Record<string, string> = {
	[ChatGatewayProvider.INFOBIP]: 'infobip.infobip',
	[ChatGatewayProvider.TELEGRAM_BOT]: 'telegramBot.telegramBot',
	[ChatGatewayProvider.TELEGRAM_APP]: 'telegramApp.telegramApp',
	[ChatGatewayProvider.CUSTOM]: 'customChat.customChat',
	[ChatGatewayProvider.MESSENGER]: 'messenger.meta',
	[ChatGatewayProvider.VIBER]: 'viber.viber',
	[ChatGatewayProvider.WEBCHAT]: 'webchat.webchat',
};

const chatGatewayTitle = computed(() => {
	const locale = provider.value
		? providerTitleLocale[provider.value]
		: undefined;
	return locale
		? t(`objects.routing.chatGateways.${locale}`)
		: t('objects.routing.gateways.gateways', 1);
});

const path = computed(() => [
	{
		name: t('objects.routing.routing'),
	},
	{
		name: t('objects.routing.chatGateways.chatGateways', 2),
		route: '/routing/chat-gateways',
	},
	{
		name: `${isNew.value ? t('objects.new') : originalItemInstance.value?.name} ${chatGatewayTitle.value}`,
		route: {
			name: currentTab.value?.pathName,
			query: route.query,
		},
	},
]);
</script>
