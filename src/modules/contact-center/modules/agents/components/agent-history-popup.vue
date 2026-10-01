<template>
  <wt-popup
    :shown="!!historyId"
    overflow
    @close="close"
  >
    <template #title>
      {{ t('objects.ccenter.agents.statusHistory') }}
    </template>
    <template #main>
      <section class="agent-history-popup table-section">
        <table-filters-panel
          class="agent-history-popup__filters-panel"
          :filter-options="historyFiltersOptions"
          :filters-manager="filtersManager"
          static-mode
          @filter:add="addFilter"
          @filter:delete="deleteFilter"
          @filter:reset-all="resetFilters"
          @filter:update="updateFilter"
        />

        <div class="table-section__table-wrapper agent-history-popup__table-wrapper">
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
            @column-reorder="columnReorder"
            @column-resize="columnResize"
          >
            <template #state="{ item }">
              {{ t(AgentStateLocaleMappings[item.state]) }}
            </template>
            <template #channel="{ item }">
              <span v-if="item.channel">
                {{ t(`channel.type.${item.channel}`) }}
              </span>
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
    <template #actions>
      <wt-button @click="close">
        {{ t('objects.ok') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import {
	FilterOption,
	TableFiltersPanelComponent as TableFiltersPanel,
} from '@webitel/ui-datalist/filters';
import { ButtonColor } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { endOfToday, startOfToday } from 'date-fns';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import dummyDark from '../assets/adm-agent-history-dark.svg';
import dummyLight from '../assets/adm-agent-history-light.svg';
import { historyFiltersOptions } from '../configs/historyFiltersOptions';
import { AgentStateLocaleMappings } from '../enums/AgentStateLocaleMappings';
import { useAgentHistoryDatalistStore } from '../stores/datalist/agentHistoryDatalistStore';

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const route = useRoute();

const agentHistoryDatalistStore = useAgentHistoryDatalistStore();

const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	shownHeaders,
	filtersManager,
} = storeToRefs(agentHistoryDatalistStore);

const {
	initialize,
	updatePage,
	updateSize,
	addFilter,
	updateFilter,
	deleteFilter,
	hasFilter,
	columnResize,
	columnReorder,
} = agentHistoryDatalistStore;

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty(
	{
		dataList,
		error,
		filters: computed(() => filtersManager.value.getAllValues()),
		isLoading,
	},
	computed(() => ({
		image: {
			empty: {
				dark: dummyDark,
				light: dummyLight,
			},
		},
		text: {
			empty: t('objects.ccenter.agents.emptyPopup'),
		},
	})),
);

const historyId = computed(() => route.params.historyId as string | undefined);

const todaysRange = () => ({
	from: startOfToday().getTime(),
	to: endOfToday().getTime(),
});

const ensureJoinedAtFilter = () => {
	if (hasFilter(FilterOption.JoinedAt)) return;

	addFilter({
		name: FilterOption.JoinedAt,
		value: todaysRange(),
	});
};

const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			FilterOption.JoinedAt,
		],
	});
	filtersManager.value.updateFilter({
		name: FilterOption.JoinedAt,
		value: todaysRange(),
	});
};

const close = () => emit('close');

watch(
	historyId,
	(id) => {
		if (!id) return;

		ensureJoinedAtFilter();
		initialize({
			parentId: id,
		});
	},
	{
		immediate: true,
	},
);
</script>

<style scoped>
.agent-history-popup__table-wrapper {
  flex: 0 0 440px;
}

.agent-history-popup__filters-panel {
  margin-bottom: var(--spacing-sm);
}

.agent-history-popup__filters-panel :deep(.dynamic-filter-panel-wrapper__filters) {
  grid-template-columns: repeat(2, 1fr);
}
</style>
