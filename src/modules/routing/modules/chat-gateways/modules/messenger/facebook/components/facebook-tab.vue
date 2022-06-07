<template>
  <section>
    <object-list-popup
      v-show="accountsOnPopup"
      :data-list="accountsOnPopup"
      :title="$t('objects.routing.chatGateways.messenger.accounts')"
      @close="closeAccountsPopup"
    ></object-list-popup>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.routing.chatGateways.messenger.facebook.pages') }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <wt-button
            v-if="!disableUserInput"
            @click="addOrRemovePages"
          >{{ $t('objects.routing.chatGateways.messenger.addOrRemovePages') }}
          </wt-button>
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
        :selectable="false"
      >
        <template slot="id" slot-scope="{ item }">
          <copy-action
            :value="item.id"
            :tooltips="{
              copy: item.id,
            }"
          ></copy-action>
        </template>
        <template slot="accounts" slot-scope="{ item }">
          <one-plus-many
            :collection="item.accounts"
            @input="openAccountsPopup(item)"
          ></one-plus-many>
        </template>
        <template slot="subscription" slot-scope="{ item }">
          <wt-switcher
            :disabled="!hasEditAccess"
            :value="!!item.subscribedFields"
            @change="updateSubscriptionState({ item, value: $event })"
          ></wt-switcher>
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import path from 'path';
import { mapActions } from 'vuex';
import openedObjectTableTabMixin
  from '../../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import openMessengerWindow from '../scripts/openMessengerWindow';
import getChatOriginUrl from '../../../../scripts/getChatOriginUrl';

export default {
  name: 'opened-chat-gateway-facebook-tab',
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    subNamespace: 'facebook',
    accountsOnPopup: null,
  }),
  computed: {
    baseUrl() {
      const originUrl = getChatOriginUrl();
      const chatUrl = process.env.VUE_APP_CHAT_URL;
      const uri = this.$store.getters[`${this.namespace}/${this.subNamespace}/CHAT_URI`];
      return new URL(path.join(chatUrl, uri), originUrl);
    },
  },
  methods: {
    ...mapActions({
                    updateSubscriptionState(dispatch, payload) {
                      return dispatch(`${this.namespace}/${this.subNamespace}/UPDATE_SUBSCRIPTION_STATE`, payload);
                    },
                  }),
    addOrRemovePagesWindowHandler({ data }) {
      if (data.status === 'success') this.loadList();
      else if (data.status === 'error') {
        this.$eventBus.$emit('notification', { type: 'error', text: data.detail });
      }
    },
    addOrRemovePages() {
      const url = `${this.baseUrl}?pages=setup`;
      openMessengerWindow({ url, listener: this.addOrRemovePagesWindowHandler });
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
</style>