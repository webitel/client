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
            :disabled="disableUserInput"
            :model-value="minToSec(item.start)"
            :regle-validation="getAcceptsRegleField(index, 'start')"
            format="hh:mm"
            no-label
            @update:model-value="
              setItemProp({ prop: 'start', index, value: secToMin($event) })
            "
          />
        </template>
        <template #end="{ item, index }">
          <wt-timepicker
            :disabled="disableUserInput"
            :model-value="minToSec(item.end)"
            :regle-validation="getAcceptsRegleField(index, 'end')"
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
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { useI18n } from 'vue-i18n';

import {
	getRegleEachField,
	useRegleErrorsTranslation,
} from '../../../../../app/composables/useRegleErrorsTranslation';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { useWeekDaysData } from '../composables/useWeekDaysData';
import type { CalendarCard } from '../stores';

const modelValue = defineModel<CalendarCard>({
	required: true,
});

const props = defineProps<{
	validationFields?: Partial<CardValidationFields<CalendarCard>>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
const { translateRegleErrors } = useRegleErrorsTranslation();

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

const getAcceptsRegleField = (index: number, prop: 'start' | 'end') =>
	translateRegleErrors(
		getRegleEachField(props.validationFields?.accepts, index, prop),
	);
</script>
