<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.ringtoneVolume.title') }}
    </template>
    <template>
        <div
          v-for="entity in ringtoneEntities"
          :key="entity.type"
          class="ringtone-volume-control-section__item"
        >
          <p class="ringtone-volume-control-section__title">
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
            @update:model-value="handleRingtoneVolume(entity.type, $event)"
          />
        </div>
        <wt-button
          :disabled="isRingtoneVolumeSaved"
          @click="saveRingtoneVolume"
        >
          {{ t('objects.save') }}
        </wt-button>
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import {debounce} from '@webitel/ui-sdk/scripts';
import triggerSound from '@webitel/ui-sdk/src/modules/Notifications/assets/audio/triggerSound';
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { RingtoneType } from '@webitel/ui-sdk/enums';
import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

type RingtoneVolumes = {
  [RingtoneType.Call]: number;
  [RingtoneType.Chat]: number;
  [RingtoneType.Task]: number;
};

interface RingtoneEntity {
  type: RingtoneType;
  volume: number;
}

const { t } = useI18n();
const ringtoneVolume = reactive<RingtoneVolumes>({
  [RingtoneType.Call]: 1,
  [RingtoneType.Chat]: 1,
  [RingtoneType.Task]: 1,
}); // Default ringtoneVolume levels
const isRingtoneVolumeSaved = ref(false);

const ringtoneEntities = computed<RingtoneEntity[]>(() => [
  { type: RingtoneType.Call, volume: ringtoneVolume[RingtoneType.Call] },
  { type: RingtoneType.Chat, volume: ringtoneVolume[RingtoneType.Chat] },
  { type: RingtoneType.Task, volume: ringtoneVolume[RingtoneType.Task] },
]);

function handleRingtoneVolume(type: RingtoneType, newVolume: number) {
  ringtoneVolume[type] = newVolume;
  debouncedPlayBeep(newVolume); // Debounced beep sound with selected ringtoneVolume

  const savedVolumeStr = localStorage.getItem('settings/ringtone-volume');
  if (!savedVolumeStr) {
    isRingtoneVolumeSaved.value = false;
    return;
  }

  try {
    const savedVolumes = JSON.parse(savedVolumeStr) as RingtoneVolumes;
    const isMatch = savedVolumes[RingtoneType.Call] === ringtoneVolume[RingtoneType.Call] &&
                    savedVolumes[RingtoneType.Chat] === ringtoneVolume[RingtoneType.Chat] &&
                    savedVolumes[RingtoneType.Task] === ringtoneVolume[RingtoneType.Task];
    isRingtoneVolumeSaved.value = isMatch;
  } catch {
    isRingtoneVolumeSaved.value = false;
  }
}

function saveRingtoneVolume() {
  // Save the ringtoneVolumes to localStorage as JSON object
  localStorage.setItem('settings/ringtone-volume', JSON.stringify(ringtoneVolume));
  isRingtoneVolumeSaved.value = true;
}

const debouncedPlayBeep = debounce(function(volume: number) {
  const playSound = async () => {
    const audio = await triggerSound(volume);
    audio.play();
  };
  playSound();
}, null, 200);

onMounted(() => {
  // Load the saved ringtoneVolumes from localStorage if it exists
  const savedVolumeStr = localStorage.getItem('settings/ringtone-volume');
  if (savedVolumeStr) {
    try {
      const savedVolumes = JSON.parse(savedVolumeStr) as RingtoneVolumes;
      ringtoneVolume[RingtoneType.Call] = savedVolumes[RingtoneType.Call] ?? 1;
      ringtoneVolume[RingtoneType.Chat] = savedVolumes[RingtoneType.Chat] ?? 1;
      ringtoneVolume[RingtoneType.Task] = savedVolumes[RingtoneType.Task] ?? 1;
      isRingtoneVolumeSaved.value = true;
    } catch {
      // If parsing fails, migrate old single value to new structure
      const oldVolume = parseFloat(savedVolumeStr);
      if (!isNaN(oldVolume)) {
        ringtoneVolume[RingtoneType.Call] = oldVolume;
        ringtoneVolume[RingtoneType.Chat] = oldVolume;
        ringtoneVolume[RingtoneType.Task] = oldVolume;
      }
      isRingtoneVolumeSaved.value = false;
    }
  }
});
</script>

<style scoped lang="scss">
@use '@webitel/ui-sdk/src/css/main' as *;

.wt-button {
  align-self: flex-end;
}

.ringtone-volume-control-section__title {
  @extend %typo-subtitle-2;
  padding: var(--spacing-2xs) var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}
</style>
