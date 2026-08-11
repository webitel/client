<template>
  <wt-popup
    :shown="shown"
    size="sm"
    overflow
    @close="close"
  >
    <template #title>
      {{ t('objects.lookups.calendars.holidays', 1) }}
    </template>
    <template #main>
      <div class="popup-input-form">
        <wt-input-text
          v-model:model-value="itemInstance.name"
          :label="t('objects.name')"
          required
        />
        <wt-datepicker
          v-model:model-value="itemInstance.date"
          :label="t('objects.lookups.calendars.date')"
        />
        <wt-switcher
          :model-value="itemInstance.working"
          :label="t('objects.lookups.calendars.workingTime')"
          @update:model-value="changeWorkingSwitcher"
        />
        <div
          v-if="itemInstance.working"
          class="opened-calendar-holiday-popup__wrapper"
        >
          <wt-timepicker
            format="hh:mm"
            :label="t('objects.lookups.calendars.start')"
            :custom-validators="fromValidators"
            :model-value="(itemInstance.workStart ?? 0) * 60"
            @update:model-value="updateWorkingTime($event, 'workStart')"
          />
          <wt-timepicker
            format="hh:mm"
            :label="t('objects.lookups.calendars.end')"
            :custom-validators="hourRangeValidators"
            :model-value="(itemInstance.workStop ?? 0) * 60"
            @update:model-value="updateWorkingTime($event, 'workStop')"
          />
        </div>
        <wt-switcher
          v-model:model-value="itemInstance.repeat"
          :label="t('objects.lookups.calendars.repeat')"
        />
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="!itemInstance.name"
        @click="save"
      >
        {{ t('objects.save') }}
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
import { computed, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import type { CalendarCard, CalendarExceptUi } from '../stores';

const modelValue = defineModel<CalendarCard>({
	required: true,
});

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const route = useRoute();

const shown = ref(false);

const emptyItem = (): CalendarExceptUi => ({
	name: '',
	date: Date.now(),
	repeat: true,
	working: false,
	workStart: null,
	workStop: null,
});

const itemInstance = reactive<CalendarExceptUi>(emptyItem());

const holidayIndex = computed(
	() => route.params.holidayIndex as string | undefined,
);

const holidayList = computed(() => modelValue.value.excepts ?? []);

const hourRangeValidators = computed(() => [
	{
		name: 'hourRange',
		text: t('validation.hourRange'),
	},
]);

const fromValidators = computed(() => [
	...hourRangeValidators.value,
	{
		name: 'timerangeStartLessThanEnd',
		text: t('validation.timerangeStartLessThanEnd'),
	},
]);

const resetItemInstance = () => {
	Object.assign(itemInstance, emptyItem());
};

const initEditedValue = () => {
	if (holidayIndex.value && holidayIndex.value !== 'new') {
		const source = holidayList.value[Number(holidayIndex.value)];
		if (source) {
			Object.assign(itemInstance, {
				...source,
			});
		}
	}
};

const close = () => {
	shown.value = false;
	emit('close');
};

const save = () => {
	const excepts = [
		...(modelValue.value.excepts ?? []),
	];
	if (holidayIndex.value !== 'new') {
		excepts.splice(Number(holidayIndex.value), 1, {
			...itemInstance,
		});
	} else {
		excepts.push({
			...itemInstance,
		});
	}
	modelValue.value.excepts = excepts;
	close();
};

const changeWorkingSwitcher = (event: boolean) => {
	itemInstance.working = event;
	itemInstance.workStart = event ? 9 * 60 : null;
	itemInstance.workStop = event ? 20 * 60 : null;
};

const updateWorkingTime = (event: number, prop: 'workStart' | 'workStop') => {
	itemInstance[prop] = event ? event / 60 : null;
};

watch(
	holidayIndex,
	(value) => {
		if (value === 'new') {
			resetItemInstance();
			shown.value = true;
			return;
		}
		if (value) {
			initEditedValue();
			shown.value = true;
			return;
		}
		shown.value = false;
	},
	{
		immediate: true,
	},
);

watch(holidayList, initEditedValue);
</script>

<style lang="scss" scoped>
.opened-calendar-holiday-popup__wrapper {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: space-between;
}

.popup-input-form {
  display: grid;
  grid-gap: var(--spacing-sm);
}
</style>
