<template>
  <section class="ringtone-volume settings-section-item">
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('settings.ringtoneVolume.title') }}
      </h3>
    </header>
    <form>
      <div class="ringtone-volume__wrapper">
        <wt-slider
          :value="ringtoneVolume"
          :min="0"
          :max="1"
          :step="0.01"
          label="Volume"
          show-input
          tooltip="auto"
          debounce
          @input="handleRingtoneVolumeChange"
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
import debounce from '@webitel/ui-sdk/src/scripts/debounce';

export default {
  data() {
    return {
      ringtoneVolume: 0.5, // Default ringtoneVolume level
      isRingtoneVolumeSaved: false,
      audioCtx: null, // Audio context will be created upon user interaction
    };
  },
  methods: {
    handleRingtoneVolumeChange(newVolume) {
      this.ringtoneVolume = newVolume;
      this.debouncedPlayBeep(newVolume); // Debounced beep sound with selected ringtoneVolume

      const savedVolume = localStorage.getItem('settings/ringtone-volume');
      if (savedVolume === null || parseFloat(savedVolume) !== newVolume) {
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
    playBeep(ringtoneVolume) {
      // Initialize the AudioContext if it hasn't been created yet
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      const oscillator = this.audioCtx.createOscillator();

      oscillator.frequency.setValueAtTime(440, this.audioCtx.currentTime); // Standard A4 note

      const gainNode = this.audioCtx.createGain();
      gainNode.gain.value = ringtoneVolume; // Set the ringtoneVolume based on the selected value

      oscillator.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      oscillator.start();

      oscillator.stop(this.audioCtx.currentTime + 0.2);
    },
    // Use your custom debounce method
    debouncedPlayBeep: debounce(function (volume) {
      this.playBeep(volume);
    }, {}, 300), // Debounce options and 300ms wait time
  },
  mounted() {
    // Load the saved ringtoneVolume from localStorage if it exists
    const savedVolume = localStorage.getItem('settings/ringtone-volume');
    if (savedVolume !== null) {
      this.ringtoneVolume = parseFloat(savedVolume);
      this.isRingtoneVolumeSaved = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.ringtone-volume {
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
