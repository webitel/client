<template>
    <main class="auth login">
        <!--        ANIMATION CANVAS-->
        <canvas ref="auth-canvas" class="canvas"></canvas>
        <!--        TODO: alert component-->

        <header class="auth__header">
            <div class="logo">Webitel</div>
        </header>

        <form
                class="auth__form"
                ref="login"
                @submit.prevent="submit"
        >
            <h2 class="auth__title">{{$t('auth.loginTitle')}}</h2>
            <p class="auth__subtitle">{{$t('auth.loginSubtitle')}}</p>

            <form-input
                    class="form__input"
                    v-model.trim="$v.form.username.$model"
                    :label="$t('auth.user')"
                    :placeholder="$t('auth.userPlaceholder')"
                    :v="$v.form.username"
                    :autofocus="true"
            ></form-input>

            <form-input
                    class="form__input"
                    v-model.trim="$v.form.password.$model"
                    :label="$t('auth.password')"
                    :placeholder="$t('auth.passwordPlaceholder')"
                    :v="$v.form.password"
                    :type="'password'"
            ></form-input>

            <router-link
                    class="form__reset-password"
                    :to="{ path: '/register', query: { reset: true }}">
                {{$t('auth.resetPasswordLink')}}</router-link>

            <btn
                    class="btn form__button"
                    type="submit"
            >
                {{$t('auth.loginSubmit')}}
            </btn>
        </form>
    </main>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import formInput from '../utils/form-input';
import btn from '../utils/btn';

import { login, logout } from '../../api/auth/auth';
import errorMixin from '../../mixins/errorMixin';
import loginAnimation from '../../assets/js/loginAnimation';

export default {
  name: 'the-login',
  components: {
    'form-input': formInput,
    btn,
  },
  mixins: [errorMixin],
  data() {
    return {
      form: {
        username: 'srgdemon@webitel.lo',
        password: '12qwaszx',
      },
      animationInstance: null,
    };
  },

  // by vuelidate
  validations: {
    form: {
      username: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  mounted() {
    // form is sent to calc dynamic animation border
    this.animationInstance = loginAnimation;
    this.animationInstance.start(this.$refs['auth-canvas'], this.$refs.login);
  },
  destroyed() {
    this.animationInstance.end();
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      // if its still pending or an error is returned do not submit
      if (this.$v.form.$pending || this.$v.form.$error) return;

      login(this.form)
        .catch((error) => {
          this.showError(error); // from Mixin
        });
    },
  },
};
</script>

<style lang="scss" scoped>
    @import "../../assets/css/auth/auth";

    .form__reset-password {
        @extend .typo-input-label;

        position: absolute;
        bottom: 146px;
        right: 20px;
        text-decoration: none;
        color: rgba(255, 255, 255, 0.3);
    }

    .border-underline:before {
        height: 1px;
        background: rgba(255, 255, 255, 0.3);
    }
</style>
