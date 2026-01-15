<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.ringtoneVolume.title') }}
    </template>
    <template>
        <div 
          v-for="entity in ringtoneEntities"
          :key="entity.type"
          class="settings-section-ringtone-volume"
        >
          <p class="settings-section-ringtone-volume-title">
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
            @update:model-value="(value) => handleRingtoneVolume(entity.type, value)"
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

import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

type RingtoneType = 'call' | 'chat' | 'task';

interface RingtoneVolumes {
  call: number;
  chat: number;
  task: number;
}

interface RingtoneEntity {
  type: RingtoneType;
  volume: number;
}

const { t } = useI18n();
const ringtoneVolume = reactive<RingtoneVolumes>({
  call: 1,
  chat: 1,
  task: 1,
}); // Default ringtoneVolume levels
const isRingtoneVolumeSaved = ref(false);

const ringtoneEntities = computed<RingtoneEntity[]>(() => [
  { type: 'call', volume: ringtoneVolume.call },
  { type: 'chat', volume: ringtoneVolume.chat },
  { type: 'task', volume: ringtoneVolume.task },
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
    const isMatch = savedVolumes.call === ringtoneVolume.call &&
                    savedVolumes.chat === ringtoneVolume.chat &&
                    savedVolumes.task === ringtoneVolume.task;
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
      ringtoneVolume.call = savedVolumes.call ?? 1;
      ringtoneVolume.chat = savedVolumes.chat ?? 1;
      ringtoneVolume.task = savedVolumes.task ?? 1;
      isRingtoneVolumeSaved.value = true;
    } catch {
      // If parsing fails, migrate old single value to new structure
      const oldVolume = parseFloat(savedVolumeStr);
      if (!isNaN(oldVolume)) {
        ringtoneVolume.call = oldVolume;
        ringtoneVolume.chat = oldVolume;
        ringtoneVolume.task = oldVolume;
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

.settings-section-ringtone-volume-title {
  @extend %typo-subtitle-2;
  padding: var(--spacing-2xs) var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}
</style>
