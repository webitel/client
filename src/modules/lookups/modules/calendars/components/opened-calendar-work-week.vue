<template>
  <section class="opened-calendar-work-week table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.lookups.calendars.workWeek') }}
      </h3>
    </header>

    <div class="table-section__table-wrapper">
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
        :selectable="false"
      >
        <template #name="{ item, index }">
          <span v-if="isDayStart(index)">
            {{ weekDaysList[item.day] }}
          </span>
        </template>
        <template #start="{ item, index }">
          <wt-timepicker
            :custom-validators="fromValidators"
            :disabled="disableUserInput"
            :model-value="minToSec(item.start)"
            :v="getFieldValidation(index, 'start')"
            format="hh:mm"
            no-label
            @update:model-value="
              setItemProp({ prop: 'start', index, value: secToMin($event) })
            "
          />
        </template>
        <template #end="{ item, index }">
          <wt-timepicker
            :custom-validators="toValidators"
            :disabled="disableUserInput"
            :model-value="minToSec(item.end)"
            :v="getFieldValidation(index, 'end')"
            format="hh:mm"
            no-label
            @update:model-value="
              setItemProp({ prop: 'end', index, value: secToMin($event) })
            "
          />
        </template>
        <template #state="{ item, index }">
          <wt-switcher
            :disabled="disableUserInput"
            :model-value="!item.disabled"
            @update:model-value="
              setItemProp({ prop: 'disabled', index, value: !$event })
            "
          />
        </template>
        <template #actions="{ item, index }">
          <wt-icon-action
            v-if="isDayStart(index)"
            action="add"
            @click="addRange(item.day)"
          />
          <wt-icon-action
            v-else
            action="delete"
            @click="removeRange(index)"
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { useWeekDaysAcceptsFieldValidation } from '../composables/useWeekDaysAcceptsFieldValidation';
import { useWeekDaysData } from '../composables/useWeekDaysData';
import type { CalendarCard } from '../stores';

const modelValue = defineModel<CalendarCard>({
	required: true,
});

const props = defineProps<{
	validationFields?: Record<string, unknown>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const {
	dataList,
	headers,
	weekDaysList,
	setItemProp,
	addRange,
	removeRange,
	isDayStart,
	minToSec,
	secToMin,
} = useWeekDaysData(modelValue, 'accepts');

const { getFieldValidation } = useWeekDaysAcceptsFieldValidation(
	computed(() => props.validationFields),
	computed(() => modelValue.value.accepts),
);

const hourRangeValidators = computed(() => [
	{
		name: 'hourRange',
		text: t('validation.hourRange'),
	},
]);

const intersectValidators = computed(() => [
	{
		name: 'timerangeNotIntersect',
		text: t('validation.timerangeNotIntersect'),
	},
]);

const toValidators = computed(() => [
	...hourRangeValidators.value,
	{
		name: 'timerangeStartLessThanEnd',
		text: t('validation.timerangeStartLessThanEnd'),
	},
	...intersectValidators.value,
]);

const fromValidators = computed(() => [
	...hourRangeValidators.value,
	{
		name: 'timerangeStartLessThanEnd',
		text: t('validation.timerangeStartLessThanEnd'),
	},
	...intersectValidators.value,
]);
</script>
