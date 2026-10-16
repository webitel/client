<template>
  <section>
    <header class="table-title opened-chat-gateway-messenger-facebook__header">
      <div class="table-title__actions-wrap">
        <wt-icon-action
          :action="IconAction.REFRESH"
          @click="loadList"
        />
        <wt-button
          v-if="!disableUserInput"
          @click="openSetupWindow(ChatGatewayChannelSetup.FACEBOOK)"
        >
          {{ t('objects.routing.chatGateways.messenger.addOrRemovePages') }}
        </wt-button>
      </div>
    </header>

    <wt-loader v-show="isLoading" />
    <div
      v-show="!isLoading"
      class="table-section__table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="false"
        :headers="headers"
        :selectable="false"
      >
        <template #id="{ item }">
          <wt-copy-action
            :tooltips="{
              copy: item.id,
            }"
            :value="item.id"
          />
        </template>
        <template #accounts="{ item }">
          <wt-display-chip-items :items="item.accounts" />
        </template>
        <template #subscription="{ item }">
          <wt-switcher
            :disabled="!hasUpdateAccess"
            :model-value="!!item.subscribedFields"
            @update:model-value="updateSubscription(item, $event)"
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
	type FacebookPage,
} from '@webitel/api-services/api';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { WtDisplayChipItems } from '@webitel/ui-sdk/components';
import { IconAction } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useMessengerList } from '../composables/useMessengerList';

const modelValue = defineModel<ChatGatewayCard>({
	required: true,
});

const { t } = useI18n();
const { disableUserInput, hasUpdateAccess } = useUserAccessControl();

const {
	dataList,
	isLoading,
	loadList,
	withReload,
	channelParams,
	openSetupWindow,
} = useMessengerList<FacebookPage>({
	uri: () => modelValue.value.uri,
	getList: ChatGatewayChannelsAPI.getFacebookPages,
});

const headers = computed(() => [
	{
		value: 'id',
		text: t('objects.ID'),
		width: '50px',
	},
	{
		value: 'name',
		text: t('objects.name'),
	},
	{
		value: 'accounts',
		text: t('objects.routing.chatGateways.messenger.accounts'),
	},
	{
		value: 'subscription',
		text: t('objects.routing.chatGateways.messenger.facebook.subscription'),
	},
]);

const updateSubscription = (item: FacebookPage, value: boolean) =>
	withReload(() =>
		ChatGatewayChannelsAPI.updateFacebookPageSubscription({
			...channelParams(),
			value,
			id: item.id,
		}),
	);
</script>

<style scoped>
/* [Claude] the actions are the header's only child, so space-between would leave them on the left */
.opened-chat-gateway-messenger-facebook__header {
  justify-content: flex-end;
}
</style>
