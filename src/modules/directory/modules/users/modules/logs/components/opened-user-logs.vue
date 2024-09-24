<template>
  <section class="content-wrapper">
    <header class="content-header">
      <h3 class="content-title">
        {{ t('objects.system.changelogs.logs.logs', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-icon-action
          action="download"
          @click="exportCSV({ parentId })"
        />
        <wt-table-actions
          :icons="['refresh']"
          @input="(event) => event === 'refresh' && loadData()"
        />
      </div>
    </header>


    <wt-loader v-show="isLoading" />

    <wt-dummy
      v-if="dummy && !isLoading"
      :src="dummy.src"
      :dark-mode="darkMode"
      :text="dummy.text && t(dummy.text)"
      class="dummy-wrapper"
    />

    <div
      v-show="!isLoading"
      class="table-wrapper"
    >
      <div
        v-if="dataList.length && !isLoading"
        style="display:contents;"
      >
      <transition-slide
      :offset="{
              enter: ['-5%', 0],
              leave: [0, 0]
            }"
      appear
      duration="200"
      mode="out-in"
    >
      <wt-table
        :data="dataList"
        :grid-actions="false"
        :headers="headers"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template #action="{ item }">
          {{ t(`objects.system.changelogs.logs.actionType.${item.action}`) }}
        </template>
        <template #date="{ item }">
          {{ new Date(+item.date).toLocaleString() }}
        </template>
        <template #object="{ item }">
          <adm-item-link
            v-if="item.object"
            :id="item.configId"
            :route-name="RouteNames.CHANGELOGS"
          >
            {{ item.object.name }}
          </adm-item-link>
        </template>
        <template #record="{ item }">
          <record-link
            :item="item"
          />
        </template>
      </wt-table>
      </transition-slide>
      </div>
      <filter-pagination
        :namespace="filtersNamespace"
        :next="isNext"
      />
    </div>
  </section>
</template>

<script setup>
import { TransitionSlide } from '@morev/vue-transitions';
import FilterPagination from '@webitel/ui-sdk/src/modules/Filters/components/filter-pagination.vue';
import { useTableFilters } from '@webitel/ui-sdk/src/modules/Filters/composables/useTableFilters.js';
import { useCardStore, useTableStore } from '@webitel/ui-sdk/src/store/new/index.js';
import { inject, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useDummy } from '../../../../../../../app/composables/useDummy';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import RecordLink from '../../../../../../system/modules/changelogs/modules/logs/components/changelog-logs-record-link.vue';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const {
  namespace: parentCardNamespace,
  id: parentId,

  addItem,
} = useCardStore(props.namespace);

const namespace = `${parentCardNamespace}/logs`;

const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const darkMode = inject('darkMode');

const {
  namespace: tableNamespace,

  dataList,
  selected,
  isLoading,
  headers,
  isNext,
  error,

  loadData,
  deleteData,
  sort,
  setSelected,
  onFilterEvent,
} = useTableStore(namespace);

const {
  namespace: filtersNamespace,
  restoreFilters,

  subscribe,
  flushSubscribers,
} = useTableFilters(tableNamespace);

subscribe({
  event: '*',
  callback: onFilterEvent,
});

restoreFilters();

onUnmounted(() => {
  flushSubscribers();
});

const { dummy } = useDummy({ namespace: tableNamespace, hiddenText: true });

// const getFilters = computed(() => {
//   return this.$store.getters[`${namespace}/${subNamespace}/filters/GET_FILTERS`];
// });
//
// this.initCSVExport(this.getDataForCSVExport, {
//   filename: `${this.itemInstance.name}-logs-at-${new Date().toLocaleString()}`,
// });
//
// const getDataForCSVExport = async (params) => {
//   const filters = this.getFilters;
//   const { items, next } = await LogsAPI.getList({
//     ...filters,
//     ...params,
//     parentId: this.parentId,
//   });
//
//   const transformedItems = items.map((item) => ({
//     ...item,
//     date: new Date(+item.date).toLocaleString(),
//   }));
//
//   return {
//     items: transformedItems,
//     next,
//   };
// };
</script>

<style lang="scss" scoped>
</style>
