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
          :value="volume"
          :min="0"
          :max="1"
          :step="0.01"
          label="Volume"
          show-input
          tooltip="auto"
          debounce
          @input="handleVolumeChange"
        />
        <wt-button
          :disabled="isVolumeSaved"
          @click.prevent="saveVolume"
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
      volume: 0.5, // Default volume level
      isVolumeSaved: false,
      audioCtx: null, // Audio context will be created upon user interaction
    };
  },
  methods: {
    handleVolumeChange(newVolume) {
      this.volume = newVolume;
      this.debouncedPlayBeep(newVolume); // Debounced beep sound with selected volume

      const savedVolume = localStorage.getItem('settings/ringtone-volume');
      if (savedVolume === null || parseFloat(savedVolume) !== newVolume) {
        this.isVolumeSaved = false;
      } else {
        this.isVolumeSaved = true;
      }
    },
    saveVolume() {
      // Save the volume to localStorage
      localStorage.setItem('settings/ringtone-volume', this.volume);
      this.isVolumeSaved = true;
    },
    playBeep(volume) {
      // Initialize the AudioContext if it hasn't been created yet
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      // Create an oscillator node
      const oscillator = this.audioCtx.createOscillator();

      // Set the oscillator frequency (Hz)
      oscillator.frequency.setValueAtTime(440, this.audioCtx.currentTime); // Standard A4 note

      // Create a gain node to control the volume
      const gainNode = this.audioCtx.createGain();
      gainNode.gain.value = volume; // Set the volume based on the selected value

      // Connect the oscillator to the gain node, then to the audio context's destination (speakers)
      oscillator.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      // Start the oscillator
      oscillator.start();

      // Stop the oscillator after a short duration (e.g., 200 ms for a beep sound)
      oscillator.stop(this.audioCtx.currentTime + 0.2);
    },
    // Use your custom debounce method
    debouncedPlayBeep: debounce(function (volume) {
      this.playBeep(volume);
    }, { leading: false, trailing: true }, 300), // Debounce options and 300ms wait time
  },
  mounted() {
    // Load the saved volume from localStorage if it exists
    const savedVolume = localStorage.getItem('settings/ringtone-volume');
    if (savedVolume !== null) {
      this.volume = parseFloat(savedVolume);
      this.isVolumeSaved = true;
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
