<template>
  <section class="table-section">
    <holiday-popup
      v-model="modelValue"
      @close="closePopup"
    />
    <delete-confirmation-popup
      :shown="deletePopupShown"
      :delete-count="deletePopupCount"
      :callback="deletePopupCallback"
      @close="closeDelete"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.lookups.calendars.holidays', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-search-bar
          v-model="search"
          debounce
          @enter="loadList"
          @search="loadList"
        />
        <delete-all-action
          v-if="!disableUserInput"
          v-show="selectedRows.length"
          :selected-count="selectedRows.length"
          @click="
            askDeleteConfirmation({
              deleted: selectedRows,
              callback: () => deleteData(selectedRows),
            })
          "
        />
        <wt-icon-btn
          :disabled="disableUserInput"
          class="icon-action"
          icon="plus"
          @click="create"
        />
      </div>
    </header>

    <wt-empty
      v-if="!filteredList.length"
      :text="search ? t('objects.emptyResultSearch') : undefined"
    />

    <div
      v-show="filteredList.length"
      class="table-section__table-wrapper"
    >
      <wt-table
        :data="filteredList"
        :headers="headers"
        :selected="selectedRows"
        @update:selected="selectedRows = $event"
      >
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
          <wt-switcher
            :disabled="disableUserInput"
            :model-value="item.repeat"
            @update:model-value="setRepeatValue(index, $event)"
          />
        </template>
        <template #actions="{ item, index }">
          <wt-icon-action
            action="edit"
            :disabled="disableUserInput"
            @click="edit(index)"
          />
          <wt-icon-action
            action="delete"
            :disabled="disableUserInput"
            @click="
              askDeleteConfirmation({
                deleted: [item],
                callback: () => deleteData([item]),
              })
            "
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import ConvertDurationWithMinutes from '@webitel/ui-sdk/src/scripts/convertDurationWithMinutes.js';
import { formatDate } from '@webitel/ui-sdk/utils';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import CalendarRouteNames from '../router/_internals/CalendarRouteNames.enum';
import type { CalendarCard, CalendarExceptUi } from '../stores';
import HolidayPopup from './opened-calendar-holiday-popup.vue';

type CalendarExceptRow = CalendarExceptUi & {
	sourceIndex: number;
};

const modelValue = defineModel<CalendarCard>({
	required: true,
});

defineProps<{
	validationFields?: Record<string, unknown>;
}>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { disableUserInput } = useUserAccessControl();

const search = ref('');
const selectedRows = ref<CalendarExceptRow[]>([]);
const filteredList = ref<CalendarExceptRow[]>([]);

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const deletePopupShown = computed(() => isDeleteConfirmationPopup.value);
const deletePopupCount = computed(() => deleteCount.value);
const deletePopupCallback = computed(() => deleteCallback.value);

const headers = computed(() => [
	{
		value: 'name',
		text: t('objects.name'),
	},
	{
		value: 'date',
		text: t('objects.lookups.calendars.date'),
	},
	{
		value: 'workStart',
		text: t('objects.lookups.calendars.workStart'),
	},
	{
		value: 'workStop',
		text: t('objects.lookups.calendars.workStop'),
	},
	{
		value: 'repeat',
		text: t('objects.lookups.calendars.repeat'),
	},
]);

const holidayList = computed(() => modelValue.value.excepts ?? []);

const loadList = () => {
	const q = search.value.toLowerCase();
	filteredList.value = holidayList.value
		.map((holiday, sourceIndex) => ({
			...holiday,
			sourceIndex,
		}))
		.filter((holiday) => (holiday.name ?? '').toLowerCase().includes(q));
};

const setRepeatValue = (index: number, value: boolean) => {
	const excepts = modelValue.value.excepts ?? [];
	const item = filteredList.value[index];
	const realIndex = item?.sourceIndex;

	if (realIndex === undefined || realIndex < 0 || realIndex >= excepts.length) {
		return;
	}

	excepts[realIndex] = {
		...excepts[realIndex],
		repeat: value,
	};
	modelValue.value.excepts = [
		...excepts,
	];
	loadList();
};

const deleteData = (deleted: CalendarExceptRow | CalendarExceptRow[]) => {
	const items = Array.isArray(deleted)
		? deleted
		: [
				deleted,
			];
	const indexes = new Set(
		items.map((item) => item.sourceIndex).filter((index) => index >= 0),
	);

	modelValue.value.excepts = (modelValue.value.excepts ?? []).filter(
		(_, index) => !indexes.has(index),
	);
	selectedRows.value = [];
	loadList();
};

const prettifyDate = (date: number | string | undefined) =>
	formatDate(Number(date), FormatDateMode.DATE);

const create = () => {
	router.push({
		name: CalendarRouteNames.HOLIDAYS,
		params: {
			...route.params,
			holidayIndex: 'new',
		},
		query: route.query,
	});
};

const edit = (index: number) => {
	const item = filteredList.value[index];

	router.push({
		name: CalendarRouteNames.HOLIDAYS,
		params: {
			...route.params,
			holidayIndex: String(item.sourceIndex),
		},
		query: route.query,
	});
};

const closePopup = () => {
	router.replace({
		name: CalendarRouteNames.HOLIDAYS,
		params: {
			...route.params,
			holidayIndex: '',
		},
		query: route.query,
	});
};

watch(holidayList, loadList, {
	immediate: true,
	deep: true,
});
</script>
