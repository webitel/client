<template>
  <section class="table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.queues.queues', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.REFRESH]"
          @click:refresh="loadDataList"
        />
      </div>
    </header>

    <div class="table-section__table-wrapper">
      <wt-empty
        v-show="showEmpty"
        :image="imageEmpty"
        :text="textEmpty"
      />

      <wt-loader v-show="isLoading" />

      <wt-table
        v-show="dataList.length && !isLoading"
        :data="dataList"
        :grid-actions="false"
        :headers="shownHeaders"
        :selectable="false"
        reorderable-columns
        resizable-columns
        sortable
        @column-reorder="columnReorder"
        @column-resize="columnResize"
        @sort="updateSort"
      >
        <template #name="{ item }">
          <wt-item-link
            v-if="item.queue"
            :link="queueLink(item)"
          >
            {{ item.queue.name }}
          </wt-item-link>
        </template>

        <template #type="{ item }">
          {{ t(QueueTypeProperties[item.type].locale) }}
        </template>

        <template #count="{ item }">
          {{ item.countMembers }}
        </template>

        <template #waiting="{ item }">
          {{ item.waitingMembers }}
        </template>

        <template #strategy="{ item }">
          {{ item.strategy }}
        </template>
      </wt-table>
      <wt-pagination
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
import type { EngineAgentInQueue } from '@webitel/api-services/gen/models';
import { useNestedTableList } from '@webitel/ui-datalist';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import QueueTypeProperties from '../../../../queues/lookups/QueueTypeProperties.lookup';
import { useAgentQueuesDatalistStore } from '../stores/datalist/agentQueuesDatalistStore';

const { t } = useI18n();

const tableStore = useNestedTableList({
	useTableStore: useAgentQueuesDatalistStore,
});
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	shownHeaders,
	filtersManager,
} = storeToRefs(tableStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	columnResize,
	columnReorder,
} = tableStore;

const queueLink = (item: EngineAgentInQueue) => ({
	name: `${RouteNames.QUEUES}-card`,
	params: {
		id: item.queue?.id,
		type: QueueTypeProperties[item.type].subpath,
	},
});

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>
