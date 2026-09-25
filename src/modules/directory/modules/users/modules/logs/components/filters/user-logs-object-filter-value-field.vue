<template>
  <wt-multi-select
    :label="t('objects.system.changelogs.objects', 1)"
    :search-method="filterConfig.searchRecords"
    :model-value="model"
    option-value="id"
    @update:model-value="model = $event"
  />
</template>

<script setup lang="ts">
import { WtMultiSelect } from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';

import type { UserLogsObjectFilterConfig } from '../../configs/objectFilterConfig';

defineProps<{
	filterConfig: UserLogsObjectFilterConfig;
}>();

const model = defineModel<string[]>();

const { t } = useI18n();
</script>

<style scoped></style>
