<template>
  <wt-popup
    :shown="!!historyId"
    overflow
    @close="close"
  >
    <template #title>
      {{ t('objects.directory.devices.deviceHistory') }}
    </template>
    <template #main>
      <section class="history-popup">
        <div class="history-popup__filters">
          <wt-datepicker
            :label="t('objects.from')"
            :model-value="from"
            show-time
            @update:model-value="selectFrom"
          />
          <wt-datepicker
            :label="t('objects.to')"
            :model-value="to"
            show-time
            @update:model-value="selectTo"
          />
        </div>
        <div class="table-section__table-wrapper">
          <wt-loader v-show="isLoading" />
          <wt-table
            v-show="!isLoading"
            :data="dataList"
            :grid-actions="false"
            :headers="shownHeaders"
            :selectable="false"
          >
            <template #loggedIn="{ item }">
              {{ prettifyTime(item.loggedIn) }}
            </template>
            <template #loggedOut="{ item }">
              {{ prettifyTime(item.loggedOut) }}
            </template>
            <template #user="{ item }">
              <div v-if="item.user">
                {{ item.user.name }}
              </div>
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
        color="secondary"
        @click="close"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useDevicesHistoryDatalistStore } from '../stores';

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const historyStore = useDevicesHistoryDatalistStore();

const { dataList, isLoading, page, size, next, shownHeaders, filtersManager } =
	storeToRefs(historyStore);

const { initialize, updatePage, updateSize, addFilter, updateFilter } =
	historyStore;

const historyId = computed(() => route.params.historyId as string | undefined);

const from = computed(
	() =>
		(filtersManager.value.getFilter('from')?.value as number | undefined) ??
		new Date().setHours(0, 0, 0, 0),
);
const to = computed(
	() =>
		(filtersManager.value.getFilter('to')?.value as number | undefined) ??
		Date.now(),
);

const ensurePeriodFilters = () => {
	const defaults = {
		from: new Date().setHours(0, 0, 0, 0),
		to: Date.now(),
	};

	for (const [name, value] of Object.entries(defaults)) {
		if (filtersManager.value.hasFilter(name)) {
			updateFilter({
				name,
				value: filtersManager.value.getFilter(name)?.value ?? value,
			});
		} else {
			addFilter({
				name,
				value,
			});
		}
	}
};

const setPeriodFilter = (name: 'from' | 'to', value: number) => {
	if (filtersManager.value.hasFilter(name)) {
		updateFilter({
			name,
			value,
		});
	} else {
		addFilter({
			name,
			value,
		});
	}
};

const selectFrom = (value: number) => {
	setPeriodFilter('from', value);
	router.push({
		...route,
		query: {
			...route.query,
			from: String(value),
			to: String(to.value),
		},
	});
};

const selectTo = (value: number) => {
	setPeriodFilter('to', value);
	router.push({
		...route,
		query: {
			...route.query,
			to: String(value),
			from: String(from.value),
		},
	});
};

const prettifyTime = (time?: string | number) => {
	if (!time) return 'none';
	return formatDate(+time, FormatDateMode.DATETIME);
};

const close = () => emit('close');

watch(
	historyId,
	(id) => {
		if (!id) return;

		initialize({
			parentId: id,
		});
		ensurePeriodFilters();

		const fromQuery = route.query.from;
		const toQuery = route.query.to;
		if (fromQuery && toQuery) {
			setPeriodFilter('from', Number(fromQuery));
			setPeriodFilter('to', Number(toQuery));
		}
	},
	{
		immediate: true,
	},
);
</script>
