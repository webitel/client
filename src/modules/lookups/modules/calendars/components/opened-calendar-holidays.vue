<template>
  <section class="table-section">
    <holiday-popup
      :shown="!!holidayIndex"
      :item="editedHoliday"
      @close="closePopup"
      @save="saveHoliday"
    />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.lookups.calendars.holidays', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <!-- wt-search-bar is `value` + `input`, not v-model -->
        <wt-search-bar
          :value="search"
          @input="search = $event"
        />
        <delete-all-action
          v-if="!disableUserInput"
          v-show="selectedRows.length"
          :selected-count="selectedRows.length"
          @click="
            askDeleteConfirmation({
              deleted: selectedRows,
              callback: () => deleteHolidays(selectedRows),
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
      v-if="!rows.length"
      :text="search ? t('objects.emptyResultSearch') : undefined"
    />

    <div
      v-show="rows.length"
      class="table-section__table-wrapper"
    >
      <wt-table
        :data="rows"
        :headers="headers"
        :selected="selectedRows"
        @update:selected="selectedRows = $event"
      >
        <template #date="{ item }">
          {{ prettifyDate(item.date) }}
        </template>
        <template #workStart="{ item }">
          <div v-if="item.workStart != null">
            {{ ConvertDurationWithMinutes(item.workStart) }}
          </div>
        </template>
        <template #workStop="{ item }">
          <div v-if="item.workStop != null">
            {{ ConvertDurationWithMinutes(item.workStop) }}
          </div>
        </template>
        <template #repeat="{ item }">
          <wt-switcher
            :disabled="disableUserInput"
            :model-value="item.repeat"
            @update:model-value="setRepeat(item, $event)"
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            action="edit"
            :disabled="disableUserInput"
            @click="edit(item)"
          />
          <wt-icon-action
            action="delete"
            :disabled="disableUserInput"
            @click="
              askDeleteConfirmation({
                deleted: [item],
                callback: () => deleteHolidays([item]),
              })
            "
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import ConvertDurationWithMinutes from '@webitel/ui-sdk/src/scripts/convertDurationWithMinutes.js';
import { formatDate } from '@webitel/ui-sdk/utils';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import {
	type CalendarHolidayRow,
	useCalendarHolidays,
} from '../composables/useCalendarHolidays';
import CalendarRouteNames from '../router/_internals/CalendarRouteNames.enum';
import type { CalendarCard, CalendarExceptUi } from '../stores';
import HolidayPopup from './opened-calendar-holiday-popup.vue';

const modelValue = defineModel<CalendarCard>({
	required: true,
});

/** declared, not used: the card binds it to every tab */
defineProps<{
	validationFields?: Partial<CardValidationFields<CalendarCard>>;
}>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { disableUserInput } = useUserAccessControl();

const search = ref('');
const selectedRows = ref<CalendarHolidayRow[]>([]);

const { rows, upsert, remove, setRepeat } = useCalendarHolidays(
	modelValue,
	search,
);

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

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

const holidayIndex = computed(
	() => route.params.holidayIndex as string | undefined,
);

const editedHoliday = computed(() => {
	const position = Number(holidayIndex.value);

	return Number.isInteger(position)
		? modelValue.value.excepts?.[position]
		: undefined;
});

const deleteHolidays = (deleted: CalendarHolidayRow[]) => {
	remove(deleted);
	selectedRows.value = [];
};

const saveHoliday = (item: CalendarExceptUi) => {
	upsert(holidayIndex.value, item);
};

const prettifyDate = (date: number | string | undefined) =>
	formatDate(Number(date), FormatDateMode.DATE);

const openPopup = (holidayIndex: string) =>
	router.push({
		name: CalendarRouteNames.HOLIDAYS,
		params: {
			id: route.params.id,
			holidayIndex,
		},
		query: route.query,
	});

const create = () => openPopup('new');

const edit = (item: CalendarHolidayRow) => openPopup(String(item.sourceIndex));

const closePopup = () =>
	router.replace({
		name: CalendarRouteNames.HOLIDAYS,
		params: {
			id: route.params.id,
		},
		query: route.query,
	});
</script>
