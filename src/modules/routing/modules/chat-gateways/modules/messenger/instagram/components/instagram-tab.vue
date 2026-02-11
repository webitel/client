<template>
  <section>
    <object-list-popup
      v-show="accountsOnPopup"
      :data-list="accountsOnPopup"
      :title="$t('objects.routing.chatGateways.messenger.accounts')"
      @close="closeAccountsPopup"
    />
    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.routing.chatGateways.messenger.instagram.instagram') }}
      </h3>
      <div class="table-title__form-wrap">
        <wt-switcher
          :disabled="disableUserInput"
          :label="$t('objects.routing.chatGateways.messenger.instagram.comments')"
          :model-value="itemInstance.metadata.instagramComments"
          @update:model-value="setItemMetadata({ prop: 'instagramComments', value: $event })"
        />
        <wt-switcher
          :disabled="disableUserInput"
          :label="$t('objects.routing.chatGateways.messenger.instagram.mentions')"
          :model-value="itemInstance.metadata.instagramMentions"
          @update:model-value="setItemMetadata({ prop: 'instagramMentions', value: $event })"
        />
      </div>
      <div class="table-title__actions-wrap">
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <wt-button
            v-if="!disableUserInput"
            @click="addOrRemovePages"
          >
            {{ $t('objects.routing.chatGateways.messenger.addOrRemovePages') }}
          </wt-button>
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <div
      v-show="isLoaded"
      class="table-section__table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
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
          {{ item.instagram.username }}
        </template>
        <template #accounts="{ item }">
          <one-plus-many
            :collection="item.accounts"
            @input="openAccountsPopup(item)"
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import path from 'path';
import { mapActions } from 'vuex';

import openedObjectTableTabMixin from '../../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import getChatOriginUrl from '../../../../scripts/getChatOriginUrl';
import openMessengerWindow from '../../_shared/scripts/openMessengerWindow';

export default {
	name: 'OpenedChatGatewayInstagramTab',
	mixins: [
		openedObjectTableTabMixin,
	],
	inject: [
		'$eventBus',
	],
	data: () => ({
		subNamespace: 'instagram',
		accountsOnPopup: null,
	}),
	computed: {
		baseUrl() {
			const originUrl = getChatOriginUrl();
			const chatUrl = import.meta.env.VITE_CHAT_URL;
			const uri =
				this.$store.getters[`${this.namespace}/${this.subNamespace}/CHAT_URI`];
			return new URL(path.join(chatUrl, uri), originUrl);
		},
	},
	methods: {
		...mapActions({
			setItemMetadata(dispatch, payload) {
				return dispatch(`${this.namespace}/SET_ITEM_METADATA`, payload);
			},
			updateSubscriptionState(dispatch, payload) {
				return dispatch(
					`${this.namespace}/${this.subNamespace}/UPDATE_SUBSCRIPTION_STATE`,
					payload,
				);
			},
		}),
		addOrRemovePagesWindowHandler({ data }) {
			if (data.status === 'success') this.loadList();
			else if (data.status === 'error') {
				this.$eventBus.$emit('notification', {
					type: 'error',
					text: data.detail,
				});
			}
		},
		addOrRemovePages() {
			const url = `${this.baseUrl}?instagram=setup`;
			openMessengerWindow({
				url,
				listener: this.addOrRemovePagesWindowHandler,
			});
		},
		openAccountsPopup(item) {
			this.accountsOnPopup = item.accounts;
		},
		closeAccountsPopup() {
			this.accountsOnPopup = null;
		},
	},
};
</script>

<style lang="scss" scoped>
.content-header__form-wrap {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
