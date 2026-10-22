<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.ringtoneVolume.title') }}
    </template>
    <template>
        <div
          v-for="entity in ringtoneEntities"
          :key="entity.type"
          class="settings-notifications-ringtone-volume__item"
        >
          <p class="settings-notifications-ringtone-volume__title">
            {{ t(`settings.ringtoneVolume.${entity.type}`) }}
          </p>
          <wt-slider
            :model-value="entity.volume"
            :min="0"
            :max="1"
            :step="0.01"
            show-input
            tooltip="auto"
            debounce
            @update:model-value="changeRingtoneVolume(entity.type, $event)"
          />
        </div>
        <wt-button
          :disabled="isRingtoneVolumeSaved"
          class="settings-notifications-ringtone-volume__save"
          @click="saveRingtoneVolume"
        >
          {{ t('objects.save') }}
        </wt-button>
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SettingsSectionWrapper from '../../../../components/_internals/settings-section-wrapper.vue';
import { useRingtoneVolume } from '../../composables/useRingtoneVolume';

const { t } = useI18n();

const {
	ringtoneEntities,
	isRingtoneVolumeSaved,
	changeRingtoneVolume,
	saveRingtoneVolume,
} = useRingtoneVolume();
</script>

<style scoped lang="scss">
@use '@webitel/ui-sdk/src/css/main' as *;

.settings-notifications-ringtone-volume__save {
  align-self: flex-end;
}

.settings-notifications-ringtone-volume__title {
  padding: var(--spacing-2xs) var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}
</style>
