<template>
  <ul v-if="value?.length">
    <li
      v-for="(result, index) of value"
      :key="index"
    >
      {{ t(`objects.ccenter.queues.logs.resultName.${result}`) }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

defineProps<{
	value?: string[];
}>();

const { t } = useI18n();
</script>

<style scoped></style>
