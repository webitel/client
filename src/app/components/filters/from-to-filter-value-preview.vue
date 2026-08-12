<template>
  <span v-if="value">{{ preview }}</span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
	value?: {
		from?: number;
		to?: number;
	};
}>();

const preview = computed(() =>
	[
		props.value?.from,
		props.value?.to,
	]
		.map((bound) => ((bound ?? '') === '' ? '…' : bound))
		.join(' – '),
);
</script>

<style scoped></style>
