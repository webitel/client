<template>
  <section>
    <communication-popup
      v-if="isCommPopup"
      :edited-index="editedIndex"
      @close="closePopup"
    />

    <delete-confirmation-popup
      v-show="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="content-header">
      <h3
        :class="{'invalid': v.itemInstance.communications.$error}"
        class="content-title"
      >
        {{ $tc('objects.lookups.communications.communications', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <delete-all-action
          v-if="!disableUserInput"
          :class="{'hidden': anySelected}"
          :selected-count="selectedRows.length"
          @click="askDeleteConfirmation({
            deleted: selectedRows,
            callback: () => deleteData(selectedRows),
          })"
        />
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="create"
        />
      </div>
    </header>

    <div class="table-wrapper">
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
      >
        <template #destination="{ item }">
          {{ item.destination }}
        </template>
        <template #state="{ item }">
          {{ item.state }}
        </template>
        <template #attempts="{ item }">
          {{ item.attempts }}
        </template>
        <template #type="{ item }">
          {{ item.type.name }}
        </template>
        <template #priority="{ item }">
          {{ item.priority }}
        </template>
        <template #actions="{ index, item }">
          <wt-icon-action
            action="edit"
            @click="edit(index)"
          />
          <wt-icon-action
            action="delete"
            class="table-action"
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
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import openedObjectTableTabMixin from '../../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import CommunicationPopup from './opened-queue-member-communication-popup.vue';

export default {
  name: 'OpenedQueueMemberCommunication',
  components: { CommunicationPopup, DeleteConfirmationPopup },
  mixins: [openedObjectTableTabMixin],
  setup() {
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },
  data: () => ({
    dataListValue: [],
    searchValue: '',
    isCommPopup: false,
    editedIndex: null,
  }),
  watch: {
    commList() {
      this.loadList();
    },
  },
  computed: {
    ...mapState({
      commList(state) {
        return getNamespacedState(state, `${this.namespace}`).itemInstance.communications;
      },
    }),
    // override mixin map state
    dataList: {
      get() {
        return this.dataListValue;
      },
      set(value) {
        this.dataListValue = value;
      },
    },
    // override mixin map state
    search: {
      get() {
        return this.searchValue;
      },
      set(value) {
        this.searchValue = value;
      },
    },
    disableUserInput() {
      return !this.hasEditAccess;
    },
    headers() {
      return [
        {
          value: 'destination',
          text: this.$t('objects.name'),
        },
        {
          value: 'type',
          text: this.$t('objects.ccenter.queues.type'),
        },
        {
          value: 'priority',
          text: this.$t('objects.ccenter.queues.priority'),
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      dispatchDelete(dispatch, payload) {
        return dispatch(`${this.namespace}/DELETE_MEMBER_COMMUNICATION`, payload);
      },
    }),
    loadList() {
      this.dataList = this.commList
        .filter((comm) => comm.destination.includes(this.search))
        .map((comm) => ({
          ...comm,
          _isSelected: false,
        }));
    },
    create() {
      this.openPopup();
    },
    edit(index) {
      this.editedIndex = index;
      this.openPopup();
    },
    openPopup() {
      this.isCommPopup = true;
    },
    closePopup() {
      this.isCommPopup = false;
      this.editedIndex = null;
    },
    setParentId() {},
  },
};
</script>

<style lang="scss" scoped>

</style>
