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
        {{ $t('objects.routing.chatGateways.messenger.facebook.pages') }}
      </h3>
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
        <template #accounts="{ item }">
          <one-plus-many
            :collection="item.accounts"
            @input="openAccountsPopup(item)"
          />
        </template>
        <template #subscription="{ item }">
          <wt-switcher
            :disabled="!hasUpdateAccess"
            :model-value="!!item.subscribedFields"
            @update:model-value="updateSubscriptionState({ item, value: $event })"
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import path from 'path';
import { mapActions } from 'vuex';

import { useUserAccessControl } from '../../../../../../../../app/composables/useUserAccessControl';
import openedObjectTableTabMixin from '../../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import getChatOriginUrl from '../../../../scripts/getChatOriginUrl';
import openMessengerWindow from '../../_shared/scripts/openMessengerWindow';

export default {
	name: 'OpenedChatGatewayFacebookTab',
	mixins: [
		openedObjectTableTabMixin,
	],
	inject: [
		'$eventBus',
	],
	setup() {
		const { hasUpdateAccess } = useUserAccessControl();
		return {
			hasUpdateAccess,
		};
	},
	data: () => ({
		subNamespace: 'facebook',
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
			const url = `${this.baseUrl}?pages=setup`;
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

<style
  lang="scss"
  scoped
></style>
