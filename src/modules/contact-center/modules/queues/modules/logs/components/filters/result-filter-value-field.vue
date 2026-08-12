<template>
  <wt-multi-select
    :label="t('objects.ccenter.queues.logs.result')"
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
import { CallReportingStatus } from 'webitel-sdk';

interface ResultOption {
	name: string;
	value: string;
}

/** the filter stores raw status values; the select works in option objects */
const model = defineModel<string[]>();

const { t } = useI18n();

const options = computed<ResultOption[]>(() =>
	Object.values(CallReportingStatus).map((value) => ({
		value,
		name: t(`objects.ccenter.queues.logs.resultName.${value}`),
	})),
);

const selectedOptions = computed(() =>
	options.value.filter((option) => model.value?.includes(option.value)),
);

const handleInput = (selected: ResultOption[]) => {
	model.value = selected.map(({ value }) => value);
};
</script>

<style scoped></style>
