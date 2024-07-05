<template>
  <section class="ringtone">
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('settings.ringtones.title') }}
      </h3>
    </header>
    <form>
      <div class="ringtone__wrapper">
        <wt-checkbox
          :selected="isCustomRingtone"
          :label="$tc('settings.ringtones.customRingtone')"
          @change="selectRingtoneType"
        />
        <wt-select
          v-model="ringtone"
          :options="options"
          :disabled="!isCustomRingtone"
          :clearable="false"
          :label="$tc('settings.ringtones.ringtone')"
          option-label="label"
          track-by="label"
        />
        <wt-player
          v-show="audioLink"
          :src="audioLink"
          :closable="false"
          :autoplay="false"
        />
        <wt-button
          @click.prevent="saveRingtone"
        >
          {{ $t('objects.save') }}
        </wt-button>
      </div>
    </form>
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
    ringtone: {},
    options: [],
  }),
  computed: {
    ringtone: {
      get() {
        return this.ringtone;
      },
      set(value) {
        this.ringtone = value;
      },
    },
    isRingtoneSelected() {
      return this.isCustomRingtone && this.ringtone.name;
    },
    audioLink() {
     return this.isRingtoneSelected
       ? `${import.meta.env.VITE_RINGTONES_URL}/${this.ringtone.name}`
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
      this.isCustomRingtone = !this.isCustomRingtone;
      if (!this.isRingtoneSelected) this.ringtone = {};
    },
    saveRingtone() {
      this.ringtone.name
        ? localStorage.setItem('ringtone', this.ringtone.name)
        : localStorage.removeItem('ringtone');
    },
    async loadRingtonesOptions() {
      this.options = await getRingtonesList();
    },
    restoreRingtone() {
      const ringtoneName = localStorage.getItem('ringtone');
      if (ringtoneName) {
        this.ringtone = this.options.find(item => item.name === ringtoneName);
        this.isCustomRingtone = true;
      }
    },
  },

};
</script>

<style lang="scss" scoped>
.ringtone__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.wt-button {
  display: block;
  margin: 3px 0 0 auto;
}
</style>

