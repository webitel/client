<template>
  <span v-if="value">{{ preview }}</span>
</template>

<script lang="ts" setup>
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';
import { computed } from 'vue';

const props = defineProps<{
	value?: {
		from?: number;
		to?: number;
	};
}>();

const asDate = (value?: number) =>
	value ? formatDate(+value, FormatDateMode.DATETIME) : '…';

const preview = computed(
	() => `${asDate(props.value?.from)} – ${asDate(props.value?.to)}`,
);
</script>

<style scoped></style>
