<template>
  <section>
    <object-list-popup
      v-show="accountsOnPopup"
      :data-list="accountsOnPopup"
      :title="$t('objects.routing.chatGateways.facebook.pages.accounts')"
      @close="closeAccountsPopup"
    ></object-list-popup>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.routing.chatGateways.facebook.pages.pages') }}</h3>
      <div class="content-header__actions-wrap">
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <wt-button
            v-if="!disableUserInput"
            @click="addOrRemovePages"
          >{{ $t('objects.routing.chatGateways.facebook.pages.addOrRemovePages') }}
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
import { mapActions } from 'vuex';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import openFacebookWindow from '../scripts/openFacebookWindow';
import getChatOriginUrl from '../../../scripts/getChatOriginUrl';

export default {
  name: 'opened-chat-gateway-facebook-pages-tab',
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    subNamespace: 'facebookPages',
    accountsOnPopup: null,
  }),
  computed: {
    baseUrl() {
      const originUrl = getChatOriginUrl();
      const chatUrl = process.env.VUE_APP_CHAT_URL;
      const uri = this.$store.getters[`${this.namespace}/${this.subNamespace}/BASE_URL`];
      return `${originUrl}${chatUrl}/${uri}`;
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
      openFacebookWindow({ url, listener: this.addOrRemovePagesWindowHandler });
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
