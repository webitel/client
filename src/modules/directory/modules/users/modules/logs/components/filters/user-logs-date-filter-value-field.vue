<template>
  <wt-datepicker
    :model-value="(model as unknown) as never"
    :label="label"
    show-time
    @update:model-value="model = ($event as unknown) as number"
  />
</template>

<script setup lang="ts">
import { WtDatepicker } from '@webitel/ui-sdk/components';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import type { UserLogsDateFilterConfig } from '../../configs/dateFilterConfig';

const props = defineProps<{
	filterConfig: UserLogsDateFilterConfig;
}>();

const model = defineModel<number>();

const { t } = useI18n();

const label = computed(() => {
	const bound =
		props.filterConfig.bound === 'from' ? t('reusable.from') : t('reusable.to');
	return `${t('reusable.modifiedAt')}: ${bound.toLowerCase()}`;
});
</script>

<style scoped></style>
