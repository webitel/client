<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header hide-primary>
        {{ $tc('settings.settings', 2) }}
      </wt-page-header>
    </template>
    <template #main>
      <!--This wrapper "settings-section" is needed to place the "settings-section__setting"
      in a column and give them half the width of the screen-->
      <section class="settings-section">
        <article class="settings-section__setting">
          <change-password />
        </article>
        <section class="settings-section__setting">
          <header class="content-header">
            <h3 class="content-title">
              {{ $t('settings.language') }}
            </h3>
          </header>
          <form>
            <wt-select
              :label="$t('settings.language')"
              :options="languageOptions"
              :value="language"
              class="language-list"
              @input="changeLanguage"
              :clearable="false"
            />
          </form>
        </section>
        <section class="settings-section__setting">
          <header class="content-header">
            <h3 class="content-title">
              {{ $t('settings.webPhone') }}
            </h3>
          </header>
          <form>
            <div class="settings-section__wrapper settings-section__switcher">
              <p>{{ $t('settings.useWebPhone') }}</p>
              <wt-switcher
                v-model="webrtc"
                @change="changeWebrtc"
              />
            </div>
            <div
              v-show="webrtc"
              class="settings-section__wrapper"
            >
              <p>{{ $t('settings.useStun') }}</p>
              <wt-switcher
                v-model="stun"
                @change="changeStun"
              />
            </div>
          </form>
        </section>
        <section class="settings-section__setting">
          <header class="content-header">
            <h3 class="content-title">
              {{ $t('settings.callEnd') }}
            </h3>
          </header>
          <form>
            <div class="settings-section__wrapper">
              <p>{{ $t('objects.status') }}</p>
              <wt-switcher
                :value="callEndSound"
                @change="changeCallEndSoundState"
              />
            </div>
          </form>
        </section>
        <custom-ringtone />
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { required, sameAs } from '@vuelidate/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState } from 'vuex';
import { changeWebPhone, getWebPhone } from '../api/settings';
import ChangePassword from './change-password.vue';
import CustomRingtone from './custom-ringtone.vue';

export default {
  name: 'TheSettings',
  components: {
    CustomRingtone,
    ChangePassword,
  },
  inject: ['$eventBus'],
  data: () => ({
    newPassword: '',
    confirmNewPassword: '',
    isPasswordPatching: false,
    webrtc: true,
    stun: false,
    callEndSound: !!localStorage.getItem('settings/callEndSound'),
    language: {
      name: 'English',
      id: 'en',
    },
    languageOptions: [
      {
        name: 'English',
        id: 'en',
      },
      {
        name: 'Русский',
        id: 'ru',
      },
      {
        name: 'Українська',
        id: 'ua',
      },
      {
        name: 'Español',
        id: 'es',
      },
      {
        name: 'Қазақ',
        id: 'kz',
      },
    ],
  }),
  created() {
    this.restoreLanguage();
  },

  computed: {
    ...mapState({
      userId(state) {
        return getNamespacedState(state, 'userinfo').userId;
      },
    }),
  },
  async mounted() {
    try {
      const response = await getWebPhone();
      this.webrtc = response.webrtc;
      this.stun = response.stun;
    } catch (error) {
      throw error;
    }
  },

  methods: {
    async changeWebrtc(value) {
      try {
        this.webrtc = value;
        if (!value) this.stun = false;
        await changeWebPhone({
          webrtc: this.webrtc,
          stun: this.stun,
        });
      } catch (err) {
        throw err;
      }
    },

    async changeStun(value) {
      try {
        this.stun = !this.webrtc ? false : value;
        await changeWebPhone({
          webrtc: this.webrtc,
          stun: this.stun,
        });
      } catch (err) {
        throw err;
      }
    },

    changeCallEndSoundState(value) {
      value
        ? localStorage.setItem('settings/callEndSound', 'true')
        : localStorage.removeItem('settings/callEndSound');
      this.callEndSound = value;
    },

    changeLanguage(value) {
      localStorage.setItem('lang', value.id);
      this.language = value;
      this.$i18n.locale = value.id;
    },
    restoreLanguage() {
      const lang = localStorage.getItem('lang'); // get default lang
      // if there's a previously set lang, set it
      if (lang) this.language = this.languageOptions.find((item) => item.id === lang);
    },
  },
};
</script>

<style lang="scss" scoped>
.settings-section {
  display: block;
  columns: 2;
  column-gap: var(--spacing-sm);
  width: 100%;
  min-width: 200px;

  &__setting {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-sm);
    padding: 0 var(--spacing-sm) var(--spacing-sm);
    border-radius: var(--border-radius);
    box-shadow: var(--elevation-5);
    break-inside: avoid-column;
  }

  .content-title {
    @extend %typo-heading-4;
  }

  .wt-button {
    display: block;
    margin: 0 0 0 auto;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__switcher {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
