<template>
  <section>
    <header class="table-title">
      <div class="opened-chat-gateway-messenger-instagram__switchers">
        <wt-switcher
          v-model:model-value="modelValue.metadata.instagramComments"
          :disabled="disableUserInput"
          :label="t('objects.routing.chatGateways.messenger.instagram.comments')"
        />
        <wt-switcher
          v-model:model-value="modelValue.metadata.instagramMentions"
          :disabled="disableUserInput"
          :label="t('objects.routing.chatGateways.messenger.instagram.mentions')"
        />
      </div>
      <div class="table-title__actions-wrap">
        <wt-icon-action
          :action="IconAction.REFRESH"
          @click="loadList"
        />
        <wt-button
          v-if="!disableUserInput"
          @click="openSetupWindow(ChatGatewayChannelSetup.INSTAGRAM)"
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
        <template #instagram="{ item }">
          {{ item.instagram?.username }}
        </template>
        <template #accounts="{ item }">
          <wt-display-chip-items :items="item.accounts" />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
	ChatGatewayChannelSetup,
	ChatGatewayChannelsAPI,
	type InstagramPage,
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
const { disableUserInput } = useUserAccessControl();

const { dataList, isLoading, loadList, openSetupWindow } =
	useMessengerList<InstagramPage>({
		uri: () => modelValue.value.uri,
		getList: ChatGatewayChannelsAPI.getInstagramPages,
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
		value: 'instagram',
		text: t('objects.routing.chatGateways.messenger.instagram.instagram'),
	},
	{
		value: 'accounts',
		text: t('objects.routing.chatGateways.messenger.accounts'),
	},
]);
</script>

<style scoped>
.opened-chat-gateway-messenger-instagram__switchers {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: var(--spacing-xs);
}
</style>
