<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header hide-primary>
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <section class="settings-section">
        <div class="settings-section__column">
          <change-password />
          <section class="settings-section-item">
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
          <section class="settings-section-item">
            <header class="content-header">
              <h3 class="content-title">
                {{ $t('settings.webPhone') }}
              </h3>
            </header>
            <form>
              <div class="settings-section__wrapper settings-section__switcher">
                <p>{{ $t('settings.useWebPhone') }}</p>
                <wt-switcher
                  :value="webrtc"
                  @change="changeWebrtc"
                />
              </div>
              <div
                v-show="webrtc"
                class="settings-section__wrapper"
              >
                <p>{{ $t('settings.useStun') }}</p>
                <wt-switcher
                  :value="stun"
                  @change="changeStun"
                />
              </div>
            </form>
          </section>
        </div>
        <div class="settings-section__column">
          <section class="settings-section-item">
            <header class="content-header">
              <h3 class="content-title">
                {{ $t('settings.callEnd') }}
              </h3>
            </header>
            <form>
              <div class="settings-section__wrapper">
                <p>{{ $t('reusable.state') }}</p>
                <wt-switcher
                  :value="callEndSound"
                  @change="changeCallEndSoundState"
                />
              </div>
            </form>
          </section>
          <custom-ringtone />
          <ringtone-volume-control />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState } from 'vuex';
import { changeWebPhone, getWebPhone } from '../api/settings';
import ChangePassword from './change-password.vue';
import CustomRingtone from './custom-ringtone.vue';
import RingtoneVolumeControl from './ringtone-volume-control.vue';

export default {
  name: 'TheSettings',
  components: {
    CustomRingtone,
    ChangePassword,
    RingtoneVolumeControl,
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
    path() {
      return [
        {
          name: this.$tc('settings.settings', 2),
        },
      ];
    },
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
@use '@webitel/ui-sdk/src/css/main' as *;

.settings-section {
  width: 100%;
  display: flex;
  gap: var(--spacing-sm);

  &__column {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--spacing-sm);
  }

  &-item {
    display: flex;
    flex-direction: column;
    padding: 0 var(--spacing-sm) var(--spacing-sm);
    border-radius: var(--border-radius);
    box-shadow: var(--elevation-5);
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
