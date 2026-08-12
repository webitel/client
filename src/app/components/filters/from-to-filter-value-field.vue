<template>
  <div class="from-to-filter-value-field">
    <wt-input-number
      :label="`${t('objects.from')}:`"
      :model-value="model?.from"
      @update:model-value="handleInput('from', $event)"
    />
    <wt-input-number
      :label="`${t('objects.to')}:`"
      :model-value="model?.to"
      @update:model-value="handleInput('to', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

/** A numeric range filter, e.g. a call duration or a member priority. */
interface FromTo {
	from?: number;
	to?: number;
}

const model = defineModel<FromTo>();

const { t } = useI18n();

const handleInput = (key: keyof FromTo, value: number) => {
	model.value = {
		...model.value,
		[key]: value,
	};
};
</script>

<style lang="scss" scoped>
.from-to-filter-value-field {
  display: grid;
  gap: var(--spacing-xs);
  grid-template-columns: 1fr 1fr;
}
</style>
