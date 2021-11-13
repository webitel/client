<template>
  <section>
    <communication-popup
      v-if="isCommPopup"
      :edited-index="editedIndex"
      @close="closePopup"
    ></communication-popup>

    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

    <header class="content-header">
      <h3 class="content-title"
          :class="{'invalid': v.itemInstance.communications.$error}"
      >{{ $tc('objects.lookups.communications.communications', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="bucket"
          :tooltip="actionPanelDeleteTooltip"
          @click="callDelete(selectedRows)"
        ></wt-icon-btn>
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="create"
        ></wt-icon-btn>
      </div>
    </header>

    <div class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
      >
        <template slot="destination" slot-scope="{ item }">
          {{ item.destination }}
        </template>
        <template slot="state" slot-scope="{ item }">
          {{ item.state }}
        </template>
        <template slot="attempts" slot-scope="{ item }">
          {{ item.attempts }}
        </template>
        <template slot="type" slot-scope="{ item }">
          {{ item.type.name }}
        </template>
        <template slot="priority" slot-scope="{ item }">
          {{ item.priority }}
        </template>
        <template slot="actions" slot-scope="{ index, item }">
          <edit-action
            @click="edit(index)"
          ></edit-action>
          <delete-action
            @click="callDelete(item)"
          ></delete-action>
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import CommunicationPopup from './opened-queue-member-communication-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-queue-member-communication',
  mixins: [openedObjectTableTabMixin],
  components: { CommunicationPopup },
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
        { value: 'destination', text: this.$t('objects.name') },
        { value: 'type', text: this.$t('objects.ccenter.queues.type') },
        { value: 'priority', text: this.$t('objects.ccenter.queues.priority') },
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
        .map((comm) => ({ ...comm, _isSelected: false }));
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
    setParentId() {
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
