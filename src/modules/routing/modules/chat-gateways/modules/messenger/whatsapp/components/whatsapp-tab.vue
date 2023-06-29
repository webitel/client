<template>
  <section class="whatsapp-tab">
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.routing.chatGateways.messenger.whatsapp.whatsapp') }}
      </h3>
    </header>
    <div class="object-input-grid object-input-grid__w50">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.messenger.whatsapp.token')"
        :value="itemInstance.metadata.whatsappToken"
        @input="setItemMetadata({ prop: 'whatsappToken', value: $event })"
      ></wt-input>
    </div>
    <div class="whatsapp-tab__actions-wrap">
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
    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
        :selectable="false"
      >
        <template v-slot:name="{ item }">
          {{ item.phoneNumbers[0].verifiedName }}
        </template>
        <template v-slot:number="{ item }">
          {{ item.phoneNumbers[0].displayPhoneNumber }}
        </template>
        <template v-slot:review="{ item }">
          {{ item.phoneNumbers[0].nameStatus }}
        </template>
        <template v-slot:status="{ item }">
          {{ item.phoneNumbers[0].status }}
        </template>
        <template v-slot:subscription="{ item }">
          <wt-switcher
            :disabled="!hasEditAccess"
            :value="!!item.subscribedFields"
            @change="updateSubscriptionState({ item, value: $event })"
          ></wt-switcher>
        </template>
        <template v-slot:actions="{ item }">
          <wt-icon-action
            v-if="hasDeleteAccess"
            action="delete"
            class="table-action"
            @click="callDelete(item)"
          ></wt-icon-action>
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedObjectTableTabMixin
  from '../../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import openMessengerWindow from '../../_shared/scripts/openMessengerWindow';
import WhatsappAPI from '../api/whatsapp';

export default {
  name: 'opened-chat-gateway-whatsapp-tab',
  mixins: [openedObjectTableTabMixin],
  inject: ['$eventBus'],
  data: () => ({
    subNamespace: 'whatsapp',
  }),
  computed: {
    uri() {
      return this.$store.getters[`${this.namespace}/${this.subNamespace}/CHAT_URI`];
    },
  },
  methods: {
    ...mapActions({
      setItemMetadata(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_METADATA`, payload);
      },
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
      const url = WhatsappAPI.addOrRemovePagesUrl(this.uri);
      openMessengerWindow({ url, listener: this.addOrRemovePagesWindowHandler });
    },
  },
};
</script>

<style lang="scss" scoped>
.whatsapp-tab__actions-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-xs);
}
</style>
