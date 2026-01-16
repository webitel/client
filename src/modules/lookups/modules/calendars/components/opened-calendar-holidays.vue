<template>
  <section>
    <holiday-popup @close="closePopup" />
    <delete-confirmation-popup :shown="isDeleteConfirmationPopup" :delete-count="deleteCount" :callback="deleteCallback"
      @close="closeDelete" />

    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.lookups.calendars.holidays', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar v-model="search" debounce @enter="loadList" @search="loadList" />
        <delete-all-action v-if="!disableUserInput" :class="{ 'hidden': anySelected }"
          :selected-count="selectedRows.length" @click="askDeleteConfirmation({
            deleted: selectedRows,
            callback: () => deleteData(selectedRows),
          })" />
        <wt-icon-btn v-if="!disableUserInput" class="icon-action" icon="plus" @click="create" />
      </div>
    </header>

    <wt-dummy v-if="dummy" :src="dummy.src" :dark-mode="darkMode" :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper" />
    <div v-show="dataListValue.length" class="table-wrapper">
      <wt-table :data="dataList" :grid-actions="!disableUserInput" :headers="headers">
        <template #date="{ item }">
          {{ prettifyDate(item.date) }}
        </template>
        <template #workStart="{ item }">
          <div v-if="item.workStart">
            {{ ConvertDurationWithMinutes(item.workStart) }}
          </div>
        </template>
        <template #workStop="{ item }">
          <div v-if="item.workStop">
            {{ ConvertDurationWithMinutes(item.workStop) }}
          </div>
        </template>
        <template #repeat="{ item, index }">
          <wt-switcher :disabled="disableUserInput" :model-value="item.repeat"
            @update:model-value="setRepeatValue({ prop: 'repeat', index, value: $event })" />
        </template>
        <template #actions="{ item, index }">
          <wt-icon-action action="edit" @click="edit(index)" />
          <wt-icon-action action="delete" @click="askDeleteConfirmation({
            deleted: [item],
            callback: () => deleteData(item),
          })" />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import ConvertDurationWithMinutes from '@webitel/ui-sdk/src/scripts/convertDurationWithMinutes.js';
import { formatDate } from '@webitel/ui-sdk/utils';
import { mapActions, mapGetters, mapState } from 'vuex';

import dummyPicDark from '../../../../../app/assets/dummy/adm-dummy-after-search-dark.svg';
import dummyPicLight from '../../../../../app/assets/dummy/adm-dummy-after-search-light.svg';
import openedObjectTableTabMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import holidayPopup from './opened-calendar-holiday-popup.vue';

export default {
  name: 'OpenedCalendarHolidays',
  components: { holidayPopup, DeleteConfirmationPopup },
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
  }),

  computed: {
    ...mapState('lookups/calendars', {
      holidayList: (state) => state.itemInstance.excepts,
    }),
    ...mapGetters('appearance', {
      darkMode: 'DARK_MODE',
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
    headers() {
      return [
        {
          value: 'name',
          text: this.$t('objects.name'),
        },
        {
          value: 'date',
          text: this.$t('objects.lookups.calendars.date'),
        },
        {
          value: 'workStart',
          text: this.$t('objects.lookups.calendars.workStart'),
        },
        {
          value: 'workStop',
          text: this.$t('objects.lookups.calendars.workStop'),
        },
        {
          value: 'repeat',
          text: this.$t('objects.lookups.calendars.repeat'),
        },
      ];
    },
    dummyPic() {
      return this.darkMode ? dummyPicDark : dummyPicLight;
    },
    dummy() {
      if (!this.dataListValue.length) {
        if (this.searchValue) {
          return {
            src: this.dummyPic,
            text: 'objects.emptyResultSearch',
          };
        }
        return {
          src: this.dummyPic,
          text: '',
        };
      }
      return '';
    },
  },

  methods: {
    ConvertDurationWithMinutes,
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
        .map((holiday) => ({
          ...holiday,
          _isSelected: false,
        }));
    },
    setRepeatValue(payload) {
      this.setExceptItemProperty(payload);
      this.loadList();
    },
    prettifyDate(date) {
      return formatDate(+date, FormatDateMode.DATE);
    },
    create() {
      this.$router.push({
        ...this.$route,
        params: { holidayIndex: 'new' },
      })
    },
    edit(index) {
      this.$router.push({
        ...this.$route,
        params: { holidayIndex: index.toString() },
      })
    },
    closePopup() {
      this.$router.go(-1);
    },
    setParentId() { },
  },

  watch: {
    holidayList() {
      this.loadList();
    },
  },
};
</script>

<style scoped></style>
