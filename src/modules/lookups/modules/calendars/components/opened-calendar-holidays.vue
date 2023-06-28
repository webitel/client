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
        <delete-all-action
          v-if="!disableUserInput"
          :class="{'hidden': anySelected}"
          :selected-count="selectedRows.length"
          @click="callDelete(selectedRows)"
        ></delete-all-action>
      <wt-icon-btn
        v-if="!disableUserInput"
        class="icon-action"
        icon="plus"
        @click="create"
      ></wt-icon-btn>
      </div>
    </header>

    <wt-dummy
      v-if="dummy"
      :src="dummy.src"
      :text="$t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
    <div
      v-show="dataListValue.length"
      class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
      >
        <template v-slot:date="{ item }">
          {{ prettifyDate(item.date) }}
        </template>
        <template v-slot:repeat="{ item, index }">
          <wt-switcher
            :value="item.repeat"
            :disabled="disableUserInput"
            @change="setRepeatValue({ prop: 'repeat', index, value: $event })"
          ></wt-switcher>
        </template>
        <template v-slot:actions="{ item, index }">
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
import dummyPic from '../../../../../app/assets/dummy/adm-dummy-after-search.svg';

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
    dummy() {
      if (!this.dataListValue.length) {
        if (this.searchValue) {
          return {
            src: dummyPic,
            text: 'objects.emptyResultSearch',
          };
        } else {
          return {
            src: dummyPic,
            text: '',
          }
        }
      } else return '';
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
        .filter((holiday) => holiday.name.toLowerCase().includes(this.search.toLowerCase()))
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

  watch: {
    holidayList() {
      this.loadList();
    },
  },
};
</script>

<style scoped>

</style>
