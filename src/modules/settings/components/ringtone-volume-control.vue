<template>
  <section class="ringtone-volume-control settings-section-item">
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('settings.ringtoneVolume.title') }}
      </h3>
    </header>
    <form>
      <div class="ringtone-volume-control__wrapper">
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
          @click.prevent="saveRingtoneVolume"
        >
          {{ $t('objects.save') }}
        </wt-button>
      </div>
    </form>
  </section>
</template>

<script>
import triggerSound from '@webitel/ui-sdk/src/modules/Notifications/assets/audio/triggerSound';
import debounce from '@webitel/ui-sdk/src/scripts/debounce';

export default {
  data() {
    return {
      ringtoneVolume: 1, // Default ringtoneVolume level
      isRingtoneVolumeSaved: false,
    };
  },
  methods: {
    handleRingtoneVolume(newVolume) {
      this.ringtoneVolume = newVolume;
      this.debouncedPlayBeep(newVolume); // Debounced beep sound with selected ringtoneVolume

      const savedVolume = localStorage.getItem('settings/ringtone-volume');
      if (!savedVolume|| parseFloat(savedVolume) !== newVolume) {
        this.isRingtoneVolumeSaved = false;
      } else {
        this.isRingtoneVolumeSaved = true;
      }
    },
    saveRingtoneVolume() {
      // Save the ringtoneVolume to localStorage
      localStorage.setItem('settings/ringtone-volume', this.ringtoneVolume);
      this.isRingtoneVolumeSaved = true;
    },

    debouncedPlayBeep: debounce(function(volume) {
      const playSound = async () => {
        const audio = await triggerSound(volume);
        audio.play();
      };
      playSound();
    }, null, 200),
  },
  mounted() {
    // Load the saved ringtoneVolume from localStorage if it exists
    const savedVolume = localStorage.getItem('settings/ringtone-volume');
    if (savedVolume) {
      this.ringtoneVolume = parseFloat(savedVolume);
      this.isRingtoneVolumeSaved = true;
    }
  },
};
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.ringtone-volume-control {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .content-title {
    @extend %typo-heading-4;
  }

  .wt-button {
    display: block;
    margin: 0 0 0 auto;
  }
}
</style>
