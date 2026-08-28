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
          v-model:model-value="draft.name"
          :label="t('objects.name')"
          required
        />
        <wt-datepicker
          v-model:model-value="draft.date"
          :label="t('objects.lookups.calendars.date')"
        />
        <wt-switcher
          :model-value="draft.working"
          :label="t('objects.lookups.calendars.workingTime')"
          @update:model-value="changeWorkingSwitcher"
        />
        <div
          v-if="draft.working"
          class="opened-calendar-holiday-popup__wrapper"
        >
          <wt-timepicker
            format="hh:mm"
            :label="t('objects.lookups.calendars.start')"
            :model-value="(draft.workStart ?? 0) * 60"
            @update:model-value="updateWorkingTime($event, 'workStart')"
          />
          <wt-timepicker
            format="hh:mm"
            :label="t('objects.lookups.calendars.end')"
            :model-value="(draft.workStop ?? 0) * 60"
            @update:model-value="updateWorkingTime($event, 'workStop')"
          />
        </div>
        <wt-switcher
          v-model:model-value="draft.repeat"
          :label="t('objects.lookups.calendars.repeat')"
        />
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="!canSave"
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
import { useCardAnyFieldEditedWatcher } from '@webitel/ui-datalist/card';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import type { CalendarExceptUi } from '../stores';

const props = defineProps<{
	shown: boolean;
	/** the holiday being edited; absent means "new" */
	item?: CalendarExceptUi;
}>();

const emit = defineEmits<{
	close: [];
	save: [
		item: CalendarExceptUi,
	];
}>();

const { t } = useI18n();

const emptyItem = (): CalendarExceptUi => ({
	name: '',
	date: Date.now(),
	repeat: true,
	working: false,
	workStart: null,
	workStop: null,
});

const draft = ref<CalendarExceptUi>(emptyItem());

const { isAnyFieldEdited } = useCardAnyFieldEditedWatcher({
	value: draft,
});

const isWorkTimeValid = computed(() => {
	if (!draft.value.working) return true;

	const { workStart, workStop } = draft.value;
	if (workStart == null || workStop == null) return false;

	return workStart < workStop;
});

const canSave = computed(
	() =>
		Boolean(draft.value.name) &&
		isWorkTimeValid.value &&
		isAnyFieldEdited.value,
);

const close = () => emit('close');

const save = () => {
	if (!canSave.value) return;

	emit('save', {
		...draft.value,
	});
	close();
};

const changeWorkingSwitcher = (working: boolean) => {
	draft.value.working = working;
	draft.value.workStart = working ? 9 * 60 : null;
	draft.value.workStop = working ? 20 * 60 : null;
};

const updateWorkingTime = (event: number, prop: 'workStart' | 'workStop') => {
	draft.value[prop] = event != null ? event / 60 : null;
};

watch(
	() => props.shown,
	(shown) => {
		if (!shown) return;

		draft.value = {
			...emptyItem(),
			...props.item,
		};
	},
	{
		immediate: true,
	},
);
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
