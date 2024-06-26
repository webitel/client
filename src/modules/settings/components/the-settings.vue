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
          <header class="content-header">
            <h3 class="content-title">
              {{ $t('settings.changePassword') }}
            </h3>
          </header>
          <form @submit="changePassword">
            <wt-input
              v-model="newPassword"
              :label="$t('auth.password')"
              :v="v$.newPassword"
              required
              type="password"
            />
            <wt-input
              v-model="confirmNewPassword"
              :label="$t('auth.confirmPassword')"
              :v="v$.confirmNewPassword"
              required
              type="password"
            />
            <wt-button
              :disabled="disablePasswordChange"
              :loading="isPasswordPatching"
              type="submit"
              @click.prevent="changePassword"
            >
              {{ $t('objects.save') }}
            </wt-button>
          </form>
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
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState } from 'vuex';
import { changePassword, changeWebPhone, getWebPhone } from '../api/settings';

export default {
  name: 'TheSettings',
  inject: ['$eventBus'],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    newPassword: '',
    confirmNewPassword: '',
    isPasswordPatching: false,
    webrtc: true,
    stun: false,
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
  validations() {
    return {
      newPassword: {
        required,
      },
      confirmNewPassword: {
        sameAs: sameAs(this.newPassword),
      },
    };
  },

  created() {
    this.restoreLanguage();
  },

  computed: {
    ...mapState({
      userId(state) {
        return getNamespacedState(state, 'userinfo').userId;
      },
    }),
    disablePasswordChange() {
      this.v$.$touch();
      return this.v$.$pending || this.v$.$error;
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
    async changePassword() {
      try {
        this.isPasswordPatching = true;
        const changes = {
          password: this.newPassword,
        };
        await changePassword({
          id: this.userId,
          changes,
        });
        this.$eventBus.$emit('notification', {
          type: 'info',
          text: 'Password is successfully updated!',
        });
      } catch (err) {
        throw err;
      } finally {
        this.isPasswordPatching = false;
      }
    },

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
  display: flex;
  flex: 0 1 50%;
  flex-direction: column;
  min-width: 200px;
  gap: var(--spacing-sm);

  .wt-button {
    display: block;
    margin: 3px 0 0 auto;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__switcher {
    margin-bottom: var(--spacing-xs);
  }
}
</style>
