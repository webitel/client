<template>
  <wt-popup
    class="unsaved-changes-flow-popup"
    size="sm"
    @close="emit('cancel')"
  >
    <template #title>
      {{ t('reusable.warning') }}
    </template>
    <template #main>
      <div class="unsaved-changes-flow-popup__wrapper">
        <wt-icon
          icon="attention"
          :color="IconColor.ERROR"
        />
        <p>{{ t('objects.routing.flow.askingAlert', { name }) }}</p>
      </div>
    </template>
    <template #actions>
      <wt-button @click="emit('save')">
        {{ t('reusable.save') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="emit('discard')"
      >
        {{ t('reusable.doNotSave') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="emit('cancel')"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { ButtonColor, IconColor } from '@webitel/ui-sdk/enums';
import { useI18n } from 'vue-i18n';

withDefaults(
	defineProps<{
		name?: string;
	}>(),
	{
		name: '',
	},
);

const emit = defineEmits<{
	save: [];
	discard: [];
	cancel: [];
}>();

const { t } = useI18n();
</script>

<style scoped>
.unsaved-changes-flow-popup__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-sm);
}
</style>
