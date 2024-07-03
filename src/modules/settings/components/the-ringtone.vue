<template>
  <section class="settings-section__setting">
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('settings.ringtones.title') }}
      </h3>
    </header>
    <form>
      <div class="settings-section__wrapper">
        <wt-checkbox
          v-model="isCustomRingtone"
          :label="$tc('settings.ringtones.customRingtone')"
          @change="selectRingtoneType"
        />
        <wt-select
          v-model="currentRingtone"
          :options="options"
          :disabled="!isCustomRingtone"
          :clearable="false"
          :label="$tc('settings.ringtones.ringtone')"
          option-label="label"
          track-by="label"
        />
        <wt-button
          @click.prevent="saveRingtone"
        >
          {{ $t('objects.save') }}
        </wt-button>
      </div>
    </form>
    <wt-player
      v-show="audioLink"
      :src="audioLink"
      class="player"
      :closable="false"
      :autoplay="false"
    />
  </section>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { getRingtonesList } from '../api/settings';

export default {
  name: 'TheRingtone',
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    isCustomRingtone: false,
    currentRingtone: {},
    options: [],
  }),
  computed: {
    currentRingtone: {
      get() {
        return this.currentRingtone;
      },
      set(value) {
        this.currentRingtone = value;
      },
    },
    audioLink() {
     return this.currentRingtone.name && this.isCustomRingtone ?
        `https://dev.webitel.com/ringtones/${this.currentRingtone.name}`
     : '';
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
  methods: {
    selectRingtoneType() {
      if (this.isCustomRingtone && this.currentRingtone.name) this.currentRingtone = {};
    },
    saveRingtone() {
      this.currentRingtone.name
        ? localStorage.setItem('ringtone', this.currentRingtone.name)
        : localStorage.removeItem('ringtone');
    },
    async loadRingtonesOptions() {
      this.options = await getRingtonesList();
    },
    restoreRingtone() {
      const ringtoneName = localStorage.getItem('ringtone');
      if (ringtoneName) {
        this.currentRingtone = this.options.find(item => item.name === ringtoneName);
        this.isCustomRingtone = true;
      }
    },
  },

};
</script>

<style lang="scss" scoped>
.settings-section__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.wt-button {
  display: block;
  margin: 3px 0 0 auto;
}
</style>

