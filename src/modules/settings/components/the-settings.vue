<template>
  <div class="content-wrap">
    <object-header hide-primary>
      {{ $t('settings.settings') }}
    </object-header>

    <section class="object-content">
      <section class="settings-section">
        <header class="content-header">
          <h3 class="content-title">{{ $t('settings.changePassword') }}</h3>
        </header>
        <form class="object-input-grid grid-w50">
          <div>
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
              :disabled="computeDisabled"
              @click="changePassword"
            >{{ $t('objects.save') }}
            </wt-button>
          </div>
        </form>
      </section>

      <section class="settings-section">
        <header class="content-header">
          <h3 class="content-title">{{ $t('settings.language') }}</h3>
        </header>
        <form class="object-input-grid grid-w50">
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
  </div>
</template>


<script>
import { sameAs, required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import objectHeader from '../../../app/components/utils/object-utils/the-object-header.vue';
import getNamespacedState from '../../../app/store/helpers/getNamespacedState';
import { getPasswordItem, getPasswordList, patchMe, patchPasswordList } from '../api/settings';
// import DropdownSelect from '../../../app/components/utils/dropdown-select';
// import btn from '../../../app/components/utils/btn';
// import formInput from '../../../app/components/utils/form-input';

export default {
  name: 'the-settings',
  components: {
    objectHeader,
    // DropdownSelect,
    // btn,
    // formInput,
  },
  data: () => ({
    newPassword: '',
    confirmNewPassword: '',
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

  mounted() {
    const lang = localStorage.getItem('lang'); // get default lang
    // if there's a previously set lang, set it
    if (lang) this.language = this.languageOptions.find((item) => item.id === lang);
  },

  computed: {
    ...mapState({
      userId(state) {
        return getNamespacedState(state, 'userinfo').userId;
      },
    }),
    computeDisabled() {
      this.$v.$touch();
      return this.$v.$pending || this.$v.$error;
    },
  },

  methods: {
  async  changePassword() {
      // console.log('New password:', this.newPassword);
      // console.log('User ID:', this.userId);
      // console.log(instance('/userinfo'));
      // console.log(instance('/users'));
      // await instance('/userinfo')
      //  .then((response) => response)
      //  .then((data) => {
      //    data.password = this.newPassword;
      //    console.log(data);
      //  });
      // getPasswordItem({ password: this.newPassword, userId: this.userId });
      // patchPasswordList(this.newPassword, this.userId);
      await patchMe({ password: this.newPassword, userId: this.userId });
    },

    changeLanguage(value) {
      localStorage.setItem('lang', value.id);
      this.language = value;
      this.$i18n.locale = value.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.settings-section {
  margin-bottom: 28px;

  .wt-button {
    display: block;
    margin: 3px 0 0 auto;
  }
}
</style>
