<template>
    <section class="custom-ringtone settings-section__setting">
      <header class="content-header">
        <h3 class="content-title">
          {{ $t('settings.ringtones.title') }}
        </h3>
      </header>
      <form>
        <div class="custom-ringtone__wrapper">
          <wt-checkbox
            :selected="isCustomRingtone"
            :label="$tc('settings.ringtones.customRingtone')"
            @change="selectRingtoneType"
          />
          <wt-select
            :value="ringtone"
            :options="options"
            :disabled="!isCustomRingtone"
            :clearable="false"
            :label="$tc('settings.ringtones.ringtone')"
            option-label="label"
            track-by="label"
            @input="ringtone = $event"
          />
          <wt-player
            v-show="audioLink"
            :src="audioLink"
            :closable="false"
            :autoplay="false"
          />
          <wt-button
            :disabled="isRingtoneSaved"
            @click.prevent="saveRingtone"
          >
            {{ $t('objects.save') }}
          </wt-button>
        </div>
      </form>
    </section>
</template>

<script>
import { getRingtonesList } from '../api/settings';

export default {
  name: 'TheRingtone',
  data: () => ({
    isCustomRingtone: false,
    ringtone: {},
    options: [],
    savedRingtone: null,
  }),
  computed: {
    isRingtoneSelected() {
      return this.isCustomRingtone && this.ringtone.name;
    },
    audioLink() {
      return this.isRingtoneSelected
        ? `${import.meta.env.VITE_RINGTONES_URL}/${this.ringtone.name}`
        : '';
      },
    isRingtoneSaved() {
      return !this.savedRingtone && !this.ringtone.name // if was chosen default ringtone
        || this.savedRingtone === this.ringtone.name;
    }
  },
  methods: {
    selectRingtoneType() {
      this.isCustomRingtone = !this.isCustomRingtone;
      if (!this.isRingtoneSelected) this.ringtone = {};
    },
    saveRingtone() {
      this.ringtone.name
        ? localStorage.setItem('settings/ringtone', this.ringtone.name)
        : localStorage.removeItem('settings/ringtone');
      this.savedRingtone = localStorage.getItem('settings/ringtone');
    },
    async loadRingtonesOptions() {
      this.options = await getRingtonesList();
    },
    restoreRingtone() {
      const ringtoneName = localStorage.getItem('settings/ringtone');
      if (ringtoneName) {
        this.savedRingtone = ringtoneName;
        this.ringtone = this.options.find(item => item.name === ringtoneName);
        this.isCustomRingtone = true;
      }
    },
  },
  async mounted() {
    try {
      await this.loadRingtonesOptions();
      this.restoreRingtone();
    } catch (error) {
      throw error;
    }
  },

};
</script>

<style lang="scss" scoped>
.custom-ringtone__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.wt-button {
  display: block;
  margin: 0 0 0 auto;
}
</style>

