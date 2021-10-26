<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header hide-primary>
        {{ $t('settings.settings') }}
      </object-header>
    </template>
    <template slot="main">
      <!--This wrapper "settings-section" is needed to place the "settings-section__setting"
      in a column and give them half the width of the screen-->
      <section class="settings-section">
        <article class="settings-section__setting">
          <header class="content-header">
            <h3 class="content-title">{{ $t('settings.changePassword') }}</h3>
          </header>
          <form @submit="changePassword">
            <wt-input
              v-model="newPassword"
              :v="$v.newPassword"
              :label="$t('auth.password')"
              type="password"
              required
            ></wt-input>
            <wt-input
              v-model="confirmNewPassword"
              :v="$v.confirmNewPassword"
              :label="$t('auth.confirmPassword')"
              type="password"
              required
            ></wt-input>
            <wt-button
              :disabled="disablePasswordChange"
              :loading="isPasswordPatching"
              type="submit"
              @click.prevent="changePassword"
            >{{ $t('objects.save') }}
            </wt-button>
          </form>
        </article>
        <section class="settings-section__setting">
          <header class="content-header">
            <h3 class="content-title">{{ $t('settings.language') }}</h3>
          </header>
          <form>
            <wt-select
              class="language-list"
              :value="language"
              :options="languageOptions"
              :label="$t('settings.language')"
              @input="changeLanguage"
            ></wt-select>
          </form>
        </section>
      </section>
    </template>
  </wt-page-wrapper>
</template>


<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { sameAs, required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import { changePassword } from '../api/settings';
import objectHeader from '../../../app/components/utils/object-utils/the-object-header.vue';


export default {
  name: 'the-settings',
  components: {
    objectHeader,
  },
  data: () => ({
    newPassword: '',
    confirmNewPassword: '',
    isPasswordPatching: false,
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
    ],
  }),

  validations: {
    newPassword: {
      required,
    },
    confirmNewPassword: {
      sameAs: sameAs('newPassword'),
    },
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
      this.$v.$touch();
      return this.$v.$pending || this.$v.$error;
    },
  },

  methods: {
    async changePassword() {
      try {
        this.isPasswordPatching = true;
        const changes = { password: this.newPassword };
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
  flex-direction: column;
  gap: var(--component-spacing);
  flex: 0 1 50%;
  min-width: 200px;

  .wt-button {
    display: block;
    margin: 3px 0 0 auto;
  }
}
</style>
