<template>
  <section class="table-section">
    <header class="table-title opened-changelog-logs__header">
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.REFRESH, IconAction.DOWNLOAD, IconAction.FILTERS]"
          @click:refresh="loadDataList"
          @click:download="downloadCSV"
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
        :grid-actions="isSchemaObject"
        :headers="shownHeaders"
        :selectable="false"
        fixed-actions
        sortable
        @sort="updateSort"
      >
        <template #action="{ item }">
          {{ t(`objects.system.changelogs.logs.actionType.${item.action}`) }}
        </template>
        <template #date="{ item }">
          {{ formatDateTime(item.date) }}
        </template>
        <template #user="{ item }">
          <wt-item-link
            v-if="item.user"
            :link="userLink(item.user.id)"
          >
            {{ item.user.name }}
          </wt-item-link>
        </template>
        <template #userId="{ item }">
          <wt-item-link
            v-if="item.user"
            :link="userLink(item.user.id)"
          >
            {{ item.user.id }}
          </wt-item-link>
        </template>
        <template #object="{ item }">
          {{ item.object?.name }}
        </template>
        <template #record="{ item }">
          <changelog-logs-record-link :item="item" />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            :action="IconAction.DOWNLOAD"
            @click="downloadNewState(item)"
          />
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

<script lang="ts" setup>
import { ConfigLogsAPI } from '@webitel/api-services/api';
import {
	LoggerAvailableSystemObjects,
	type LoggerLog,
} from '@webitel/api-services/gen/models';
import { useNestedTableList } from '@webitel/ui-datalist';
import { FilterOption } from '@webitel/ui-datalist/filters';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { useCSVExport } from '@webitel/ui-sdk/src/modules/CSVExport/composables/useCSVExport';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import { downloadAsJSON } from '../../../../../../../app/utils/download';
import { useChangelogsCardStore } from '../../../stores/card/changelogsCardStore';
import { defaultDateFilter } from '../configs/filtersOptions';
import { useChangelogLogsDatalistStore } from '../stores/datalist/changelogLogsDatalistStore';
import ChangelogLogsRecordLink from './changelog-logs-record-link.vue';

const emit = defineEmits<{
	'click:filters': [];
}>();

const { t } = useI18n();

const changelogsCardStore = useChangelogsCardStore();
const { itemId: changelogId, originalItemInstance: changelog } =
	storeToRefs(changelogsCardStore);

const changelogLogsDatalistStore = useChangelogLogsDatalistStore();
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	shownHeaders,
	filtersManager,
} = storeToRefs(changelogLogsDatalistStore);

const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	hasFilter,
	addFilter,
} = changelogLogsDatalistStore;

if (!hasFilter(FilterOption.Date)) {
	addFilter(defaultDateFilter());
}

useNestedTableList({
	useTableStore: useChangelogLogsDatalistStore,
});

const hasPanelFilters = computed(() =>
	[
		FilterOption.Action,
		FilterOption.User,
	].some((name) => hasFilter(name)),
);

/** [Claude] only a flow keeps a state worth downloading */
const isSchemaObject = computed(
	() => changelog.value?.object?.name === LoggerAvailableSystemObjects.Schema,
);

const userLink = (id?: string | number) => ({
	name: `${RouteNames.USERS}-card`,
	params: {
		id,
	},
});

/** [Claude] a log's timestamp, or the current moment when none is given */
const formatDateTime = (date?: string | number) =>
	formatDate(date ? +date : new Date(), FormatDateMode.DATETIME);

const downloadNewState = async ({ id, date, record }: LoggerLog) => {
	const { newState } = await ConfigLogsAPI.get({
		itemId: id,
	});
	downloadAsJSON(
		JSON.parse(newState),
		`${record?.name}-${record?.id}-new-state-${formatDateTime(date)}`,
	);
};

const { initCSVExport, exportCSV } = useCSVExport({
	selected: ref([]),
});

/** [Claude] the export writes objects by name, the date is a timestamp it would leave as is */
const getDataForCSVExport = async (params: Record<string, unknown>) => {
	const { items, next } = await ConfigLogsAPI.getList(params);

	return {
		items: items.map((item: LoggerLog) => ({
			...item,
			date: formatDateTime(item.date),
		})),
		next,
	};
};

const downloadCSV = () => {
	initCSVExport(getDataForCSVExport, {
		filename: `${changelog.value?.object?.name}-logs-at-${formatDateTime()}`,
	});
	return exportCSV({
		...filtersManager.value.getAllValues(),
		parentId: changelogId.value,
	});
};

const { image: imageEmpty, text: textEmpty } = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>

<style scoped>
/* [Claude] no title on the tab, so the actions sit on the right */
.opened-changelog-logs__header {
  justify-content: flex-end;
}
</style>
