<template>
  <wt-multi-select
    :label="t('objects.ccenter.queues.endCause')"
    :model-value="selectedOptions"
    :options="options"
    chips-view
    data-key="value"
    option-label="name"
    @update:model-value="handleInput"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MemberStopCause } from 'webitel-sdk/enums';

interface StopCauseOption {
	name: string;
	value: string;
}

const model = defineModel<string[]>();

const { t } = useI18n();

const options = computed<StopCauseOption[]>(() =>
	Object.values(MemberStopCause).map((value) => ({
		value,
		name: t(`objects.ccenter.members.endCause.${String(value).toLowerCase()}`),
	})),
);

const selectedOptions = computed(() =>
	options.value.filter((option) => model.value?.includes(option.value)),
);

const handleInput = (selected: StopCauseOption[]) => {
	model.value = selected.map(({ value }) => value);
};
</script>

<style scoped></style>
