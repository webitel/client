<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.ringtoneVolume.title') }}
    </template>
    <template>
        <wt-slider
          :value="ringtoneVolume"
          :min="0"
          :max="1"
          :step="0.01"
          label="Volume"
          show-input
          tooltip="auto"
          debounce
          @input="handleRingtoneVolume"
        />
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
import { onMounted,ref } from 'vue';
import { useI18n } from 'vue-i18n';

import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

const { t } = useI18n();
const ringtoneVolume = ref(1); // Default ringtoneVolume level
const isRingtoneVolumeSaved = ref(false);

function handleRingtoneVolume(newVolume: number) {
  ringtoneVolume.value = newVolume;
  debouncedPlayBeep(newVolume); // Debounced beep sound with selected ringtoneVolume

  const savedVolume = localStorage.getItem('settings/ringtone-volume');
  if (!savedVolume || parseFloat(savedVolume) !== newVolume) {
    isRingtoneVolumeSaved.value = false;
  } else {
    isRingtoneVolumeSaved.value = true;
  }
}

function saveRingtoneVolume() {
  // Save the ringtoneVolume to localStorage
  localStorage.setItem('settings/ringtone-volume', ringtoneVolume.value.toString());
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
  // Load the saved ringtoneVolume from localStorage if it exists
  const savedVolume = localStorage.getItem('settings/ringtone-volume');
  if (savedVolume) {
    ringtoneVolume.value = parseFloat(savedVolume);
    isRingtoneVolumeSaved.value = true;
  }
});
</script>

<style scoped>
.wt-button {
  align-self: flex-end;
}
</style>
