<template>
  <wt-multi-select
    :label="labelValue"
    :model-value="selectedOptions"
    :search-method="searchTags"
    chips-view
    class="queue-tags-filter"
    data-key="name"
    option-label="name"
    v-bind="$attrs"
    @update:model-value="handleInput"
  />
</template>

<script lang="ts" setup>
import { QueuesAPI } from '@webitel/api-services/api';
import { WtMultiSelect } from '@webitel/ui-sdk/components';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

/**
 * Queue tags are free-form strings, so the filter stores names rather than ids
 * and there is nothing to look up on restore — a name is its own label.
 *
 * `searchRecords` is not taken from `filterConfig`: `FilterConfig`'s
 * constructor keeps only the keys it knows about, so anything extra passed
 * through `createFilterConfig` is dropped. This filter lives in the app, so it
 * can reach the api directly.
 */
interface TagOption {
	name: string;
}

defineProps<{
	hideLabel?: boolean;
}>();

const model = defineModel<string[]>();

const { t } = useI18n();

const labelValue = computed(() => t('webitelUI.filters.filterValue'));

const selectedOptions = computed<TagOption[]>(() =>
	(model.value ?? []).map((name) => ({
		name,
	})),
);

const searchTags = (params: unknown) => QueuesAPI.getQueuesTags(params);

const handleInput = (value: Array<TagOption | string>) => {
	model.value = value.map((tag) => (typeof tag === 'string' ? tag : tag.name));
};
</script>

<style scoped></style>
