<template>
  <div class="joined-at-filter-value-field">
    <wt-datepicker
      :label="`${t('objects.from')}:`"
      :model-value="model?.from"
      class="joined-at-filter-value-field__picker"
      show-time
      @update:model-value="handleInput('from', $event)"
    />
    <wt-datepicker
      :label="`${t('objects.to')}:`"
      :model-value="model?.to"
      class="joined-at-filter-value-field__picker"
      show-time
      @update:model-value="handleInput('to', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { endOfToday, startOfToday } from 'date-fns';
import { useI18n } from 'vue-i18n';

interface JoinedAt {
	from?: number;
	to?: number;
}

/** the log defaults to today, as it always has */
const model = defineModel<JoinedAt>({
	default: (): JoinedAt => ({
		from: startOfToday().getTime(),
		to: endOfToday().getTime(),
	}),
});

const { t } = useI18n();

const handleInput = (key: keyof JoinedAt, value: number) => {
	model.value = {
		...model.value,
		[key]: value,
	};
};
</script>

<style lang="scss" scoped>
.joined-at-filter-value-field {
  display: grid;
  gap: var(--spacing-xs);
}
</style>
