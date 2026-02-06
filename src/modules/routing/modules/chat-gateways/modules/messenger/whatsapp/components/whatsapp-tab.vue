<template>
  <section class="whatsapp-tab">
    <delete-confirmation-popup
      v-show="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.routing.chatGateways.messenger.whatsapp.whatsapp') }}
      </h3>
    </header>
    <div class="object-input-grid object-input-grid__w50">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.routing.chatGateways.messenger.whatsapp.token')"
        :model-value="itemInstance.metadata.whatsappToken"
        @update:model-value="setItemMetadata({ prop: 'whatsappToken', value: $event })"
      />
    </div>
    <div class="whatsapp-tab__actions-wrap">
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
        <template #name="{ item }">
          {{ item.phoneNumbers[0].verifiedName }}
        </template>
        <template #number="{ item }">
          {{ item.phoneNumbers[0].displayPhoneNumber }}
        </template>
        <template #review="{ item }">
          {{ item.phoneNumbers[0].nameStatus }}
        </template>
        <template #status="{ item }">
          {{ item.phoneNumbers[0].status }}
        </template>
        <template #subscription="{ item }">
          <wt-switcher
            :disabled="!hasUpdateAccess"
            :model-value="!!item.subscribedFields"
            @update:model-value="updateSubscriptionState({ item, value: $event })"
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            v-if="hasDeleteAccess"
            action="delete"
            @click="askDeleteConfirmation({
              deleted: [item],
              callback: () => deleteData(item),
            })"
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { mapActions } from 'vuex';

import { useUserAccessControl } from '../../../../../../../../app/composables/useUserAccessControl';
import openedObjectTableTabMixin from '../../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import openMessengerWindow from '../../_shared/scripts/openMessengerWindow';
import WhatsappAPI from '../api/whatsapp';

export default {
  name: 'OpenedChatGatewayWhatsappTab',
  components: { DeleteConfirmationPopup },
  mixins: [openedObjectTableTabMixin],
  inject: ['$eventBus'],
  setup() {
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();
    const { hasUpdateAccess } = useUserAccessControl();

    return {
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,
      hasUpdateAccess,

      askDeleteConfirmation,
      closeDelete,
    };
  },
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
      const url = WhatsappAPI.addOrRemovePagesUrl(this.uri);
      openMessengerWindow({
        url,
        listener: this.addOrRemovePagesWindowHandler,
      });
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
.whatsapp-tab__actions-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-xs);
}
</style>
