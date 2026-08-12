<template>
  <wt-multi-select
    :label="t('objects.lookups.buckets.buckets', 2)"
    :model-value="model"
    :search-method="loadBucketsOptions"
    chips-view
    @update:model-value="model = $event"
  />
</template>

<script lang="ts" setup>
import { BucketsAPI } from '@webitel/api-services/api';
import { useI18n } from 'vue-i18n';

/** buckets are a lookup, so the filter stores the selected objects */
const model =
	defineModel<
		{
			id?: string | number;
			name?: string;
		}[]
	>();

const { t } = useI18n();

const loadBucketsOptions = (params: unknown) => BucketsAPI.getLookup(params);
</script>

<style scoped></style>
