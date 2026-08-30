<template>
  <wt-empty
    v-if="showEmpty"
    :image="image"
    :text="text"
  />
</template>

<script setup lang="ts">
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { computed } from 'vue';

const props = withDefaults(
	defineProps<{
		dataList?: unknown[];
		isLoading?: boolean;
		filters?: Record<string, unknown>;
	}>(),
	{
		dataList: () => [],
		isLoading: false,
	},
);

const { showEmpty, image, text } = useTableEmpty({
	dataList: computed(() => props.dataList),
	isLoading: computed(() => props.isLoading),
	filters: computed(() => props.filters),
});
</script>
