<template>
  <section class="opened-chat-gateway-messenger-whatsapp">
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <div class="opened-card-input-grid opened-card-input-grid--w50">
      <wt-input-text
        v-model:model-value="modelValue.metadata.whatsappToken"
        :disabled="disableUserInput"
        :label="t('objects.routing.chatGateways.messenger.whatsapp.token')"
      />
    </div>
    <div class="opened-chat-gateway-messenger-whatsapp__actions-wrap">
      <wt-icon-action
        :action="IconAction.REFRESH"
        @click="loadList"
      />
      <wt-button
        v-if="!disableUserInput"
        @click="openSetupWindow(ChatGatewayChannelSetup.WHATSAPP)"
      >
        {{ t('objects.routing.chatGateways.messenger.addOrRemovePages') }}
      </wt-button>
    </div>
    <wt-loader v-show="isLoading" />
    <div
      v-show="!isLoading"
      class="table-section__table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
        :selectable="false"
      >
        <template #name="{ item }">
          {{ item.phoneNumbers[0]?.verifiedName }}
        </template>
        <template #number="{ item }">
          {{ item.phoneNumbers[0]?.displayPhoneNumber }}
        </template>
        <template #review="{ item }">
          {{ item.phoneNumbers[0]?.nameStatus }}
        </template>
        <template #status="{ item }">
          {{ item.phoneNumbers[0]?.status }}
        </template>
        <template #subscription="{ item }">
          <wt-switcher
            :disabled="!hasUpdateAccess"
            :model-value="!!item.subscribedFields"
            @update:model-value="updateSubscription(item, $event)"
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            v-if="hasDeleteAccess"
            :action="IconAction.DELETE"
            @click="
              askDeleteConfirmation({
                deleted: [item],
                callback: () => deleteAccount(item),
              })
            "
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
	ChatGatewayChannelSetup,
	ChatGatewayChannelsAPI,
	type WhatsappAccount,
} from '@webitel/api-services/api';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useMessengerList } from '../composables/useMessengerList';

const modelValue = defineModel<ChatGatewayCard>({
	required: true,
});

const { t } = useI18n();
const { disableUserInput, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const {
	dataList,
	isLoading,
	loadList,
	withReload,
	channelParams,
	openSetupWindow,
} = useMessengerList<WhatsappAccount>({
	uri: () => modelValue.value.uri,
	getList: ChatGatewayChannelsAPI.getWhatsappAccounts,
});

const headers = computed(() => [
	{
		value: 'name',
		text: t('objects.name'),
	},
	{
		value: 'review',
		text: t('objects.routing.chatGateways.messenger.whatsapp.review'),
	},
	{
		value: 'number',
		text: t('objects.routing.chatGateways.messenger.whatsapp.number'),
	},
	{
		value: 'status',
		text: t('objects.routing.chatGateways.messenger.whatsapp.status'),
	},
	{
		value: 'subscription',
		text: t('objects.enabled'),
	},
]);

const updateSubscription = (item: WhatsappAccount, value: boolean) =>
	withReload(() =>
		ChatGatewayChannelsAPI.updateWhatsappSubscription({
			...channelParams(),
			value,
			id: item.id,
		}),
	);

const deleteAccount = (item: WhatsappAccount) =>
	withReload(() =>
		ChatGatewayChannelsAPI.deleteWhatsappAccount({
			...channelParams(),
			id: item.id,
		}),
	);
</script>

<style scoped>
.opened-chat-gateway-messenger-whatsapp__actions-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-xs);
}
</style>
