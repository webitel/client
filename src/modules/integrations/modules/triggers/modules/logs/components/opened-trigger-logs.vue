<template>
  <section class="table-section">
    <header class="table-title opened-trigger-logs__header">
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.REFRESH, IconAction.FILTERS]"
          @click:refresh="loadDataList"
          @click:filters="emit('click:filters')"
        >
          <template #filters="{ action, onClick }">
            <wt-badge :hidden="!hasPanelFilters">
              <wt-icon-action
                :action="action"
                @click="onClick"
              />
            </wt-badge>
          </template>
        </wt-action-bar>
      </div>
    </header>

    <div class="table-section__table-wrapper">
      <wt-loader v-show="isLoading" />

      <wt-table
        v-show="!isLoading"
        :data="dataList"
        :grid-actions="false"
        :headers="shownHeaders"
        :selectable="false"
        sortable
        @sort="updateSort"
      >
        <template #startedAt="{ item }">
          {{ asDate(item.startedAt) }}
        </template>
        <template #duration="{ item }">
          {{ convertDurationWithMilliseconds(item.stoppedAt - item.startedAt) }}
        </template>
        <template #state="{ item }">
          {{ t(`objects.triggerJobState.${item.state}`) }}
        </template>

        <template #column-filter="scope">
          <trigger-logs-column-filter v-bind="scope" />
        </template>

        <template #empty>
          <wt-empty
            :image="imageEmpty"
            :text="textEmpty"
          />
        </template>
      </wt-table>
      <wt-pagination
        v-show="dataList.length"
        :next="next"
        :prev="page > 1"
        :size="size"
        debounce
        @change="updateSize"
        @next="updatePage(page + 1)"
        @prev="updatePage(page - 1)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { convertDurationWithMilliseconds } from '@webitel/api-services/scripts';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import {
	defaultStartedAtFilter,
	filtersOptions,
} from '../configs/filtersOptions';
import { useTriggerLogsDatalistStore } from '../stores/datalist/triggerLogsDatalistStore';
import TriggerLogsColumnFilter from './trigger-logs-column-filter.vue';

const emit = defineEmits<{
	'click:filters': [];
}>();

const { t } = useI18n();
const route = useRoute();

const triggerLogsDatalistStore = useTriggerLogsDatalistStore();
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	shownHeaders,
	filtersManager,
} = storeToRefs(triggerLogsDatalistStore);
const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	addFilter,
	hasFilter,
} = triggerLogsDatalistStore;

/** [Claude] the badge shows a filter picked in the panel; the start date is always there, so it doesn't count */
const hasPanelFilters = computed(() =>
	filtersOptions.some(
		(filter) =>
			typeof filter !== 'string' &&
			!filter.notDeletable &&
			hasFilter(filter.name),
	),
);

const defaultFilter = defaultStartedAtFilter();
if (!hasFilter(defaultFilter.name)) addFilter(defaultFilter);

// [Claude] the tab only exists for a saved trigger, so its id is in the url
initialize({
	parentId: route.params.id as string,
});

const asDate = (value?: number | string) =>
	value ? formatDate(+value, FormatDateMode.DATETIME) : '';

const { image: imageEmpty, text: textEmpty } = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>

<style scoped>
/* [Claude] the actions are the header's only child, so they are pushed to the right */
.opened-trigger-logs__header {
  justify-content: flex-end;
}
</style>
