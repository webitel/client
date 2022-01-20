<template>
  <section>
    <holiday-popup
      v-if="isHolidayPopup"
      :edited-index="editedIndex"
      @close="closePopup"
    ></holiday-popup>
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.lookups.calendars.holidays', 2) }}</h3>
      <div class="content-header__actions-wrap">
      <wt-search-bar
        v-model="search"
        debounce
        @enter="loadList"
        @search="loadList"
      ></wt-search-bar>
      <wt-icon-btn
        v-if="!disableUserInput"
        :class="{'hidden': anySelected}"
        :tooltip="actionPanelDeleteTooltip"
        class="icon-action"
        icon="bucket"
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
        <template slot="date" slot-scope="{ item }">
          {{ prettifyDate(item.date) }}
        </template>
        <template slot="repeat" slot-scope="{ item, index }">
          <wt-switcher
            :value="item.repeat"
            :disabled="disableUserInput"
            @change="setRepeatValue({ prop: 'repeat', index, value: $event })"
          ></wt-switcher>
        </template>
        <template slot="actions" slot-scope="{ item, index }">
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
import holidayPopup from './opened-calendar-holiday-popup.vue';
import openedObjectTableTabMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-calendar-holidays',
  mixins: [openedObjectTableTabMixin],
  components: { holidayPopup },
  data: () => ({
    dataListValue: [],
    searchValue: '',
    isHolidayPopup: false,
    editedIndex: null,
  }),
  watch: {
    holidayList() {
      this.loadList();
    },
  },
  computed: {
    ...mapState('lookups/calendars', {
      holidayList: (state) => state.itemInstance.excepts,
    }),
    // override mixin map state
    dataList: {
      get() { return this.dataListValue; },
      set(value) { this.dataListValue = value; },
    },
    // override mixin map state
    search: {
      get() { return this.searchValue; },
      set(value) { this.searchValue = value; },
    },
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'date', text: this.$t('objects.lookups.calendars.date') },
        { value: 'repeat', text: this.$t('objects.lookups.calendars.repeat') },
      ];
    },
  },

  methods: {
    ...mapActions({
      dispatchDelete(dispatch, payload) {
        return dispatch(`${this.namespace}/DELETE_EXCEPT_ITEM`, payload);
      },
      setExceptItemProperty(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_EXCEPT_ITEM_PROPERTY`, payload);
      },
    }),
    loadList() {
      this.dataList = this.holidayList
        .filter((holiday) => holiday.name.includes(this.search))
        .map((holiday) => ({ ...holiday, _isSelected: false }));
    },
    setRepeatValue(payload) {
      this.setExceptItemProperty(payload);
      this.loadList();
    },
    prettifyDate(date) {
      return new Date(+date).toLocaleDateString();
    },
    create() {
      this.openHolidayPopup();
    },
    edit(index) {
      this.editedIndex = index;
      this.openHolidayPopup();
    },
    openHolidayPopup() {
      this.isHolidayPopup = true;
    },
    closePopup() {
      this.isHolidayPopup = false;
      this.editedIndex = null;
    },
    setParentId() {
    },
  },
};
</script>

<style scoped>

</style>
