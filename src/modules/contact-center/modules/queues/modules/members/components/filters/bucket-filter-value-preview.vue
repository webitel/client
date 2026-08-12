<template>
  <ul v-if="value?.length">
    <li
      v-for="(bucket, index) of value"
      :key="index"
    >
      {{ bucket.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{
	value?: {
		id?: string | number;
		name?: string;
	}[];
}>();
</script>

<style scoped></style>
