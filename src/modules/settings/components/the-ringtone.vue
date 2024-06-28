<template>
  <section class="settings-section__setting">
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('settings.webPhone') }}
      </h3>
    </header>
    <form>
      <div class="settings-section__wrapper">
        <wt-checkbox />
        <wt-select
          v-model="currentRingtone"
          :disabled="disableRingtoneInput"
          :label="$tc('objects.directory.users.users', 1)"
          :search-method="loadRingtonesOptions"
          :v="v.currentRingtone"
        />

        <wt-button
          :disabled="currentRingtone"
          type="submit"
          @click.prevent="changeRingtone"
        >
          {{ $t('objects.save') }}
        </wt-button>
      </div>
    </form>
  </section>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { changePassword, changeWebPhone, getWebPhone } from '../api/settings';

export default {
  name: 'TheRingtone',
  // inject: ['$eventBus'],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    currentRingtone: '',
    language: {
      name: 'English',
      id: '1',
    },
    ringtoneOptions: [
      {
        name: 'English',
        id: '1',
      },
      {
        name: 'English2',
        id: '2',
      },
      {
        name: 'English3',
        id: '3',
      },
      {
        name: 'English4',
        id: '4',
      },
      {
        name: 'English5',
        id: '5',
      },
    ],
  }),

  created() {
    // this.restoreLanguage();
  },

  computed: {
    // disablePasswordChange() {
    //   this.v$.$touch();
    //   return this.v$.$pending || this.v$.$error;
    // },
  },
  async mounted() {
    // try {
    //   const response = await getWebPhone();
    //   this.webrtc = response.webrtc;
    //   this.stun = response.stun;
    // } catch (error) {
    //   throw error;
    // }
  },

  methods: {
    changeRingtone() {},
    // changeLanguage(value) {
    //   localStorage.setItem('lang', value.id);
    //   this.language = value;
    //   this.$i18n.locale = value.id;
    // },
    // restoreLanguage() {
    //   const lang = localStorage.getItem('lang'); // get default lang
    //   // if there's a previously set lang, set it
    //   if (lang) this.language = this.languageOptions.find((item) => item.id === lang);
    // },
  },

};
</script>

<style lang="scss" scoped>
</style>

