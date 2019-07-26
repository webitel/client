<template>
    <main class="auth register">
        <!--        ANIMATION CANVAS-->
        <canvas ref="auth-canvas" class="canvas"></canvas>
        <!--        TODO: alert component-->

        <header class="auth__header">
            <div class="logo">Webitel</div>
            <router-link
                    class="auth__link border-underline"
                    to="/login"
                    v-if="!this.$route.query.reset"
            >
                {{$t('auth.toLogin')}}</router-link>
        </header>
        <form
                class="auth__form"
                ref="register"
                @submit.prevent="submit"
        >
            <h2 class="auth__title fs24-lh24">{{computeTitle}}</h2>
            <p class="auth__subtitle fs12-lh24">{{$t('auth.loginSubtitle')}}</p>

            <form-input
                    class="form__input fs14"
                    v-model.trim="$v.form.username.$model"
                    :label="$t('auth.user')"
                    :placeholder="$t('auth.userPlaceholder')"
                    :v="$v.form.username"
                    :autofocus="true"
            ></form-input>

            <form-input
                    class="form__input fs14"
                    v-model.trim="$v.form.password.$model"
                    ref="passwordRef"
                    :label="$t('auth.password')"
                    :placeholder="$t('auth.passwordPlaceholder')"
                    :v="$v.form.password"
                    :type="'password'"
            ></form-input>

            <form-input
                    class="form__input fs14"
                    v-model.trim="$v.form.confirmPassword.$model"
                    :label="$t('auth.confirmPassword')"
                    :placeholder="$t('auth.passwordPlaceholder')"
                    :v="$v.form.confirmPassword"
                    :type="'password'"
            ></form-input>

            <form-input
                    class="form__input fs14"
                    v-model.trim="$v.form.certificate.$model"
                    :label="$t('auth.key')"
                    :placeholder="$t('auth.keyPlaceholder')"
                    :v="$v.form.certificate"
            ></form-input>

            <btn
                    class="btn form__button"
                    type="submit"
            >
                {{computeButton}}
            </btn>
        </form>
    </main>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';
import formInput from '../utils/form-input';
import btn from '../utils/btn';

import { login, logout } from '../../api/auth/auth';
import errorMixin from '../../mixins/errorMixin';
import loginAnimation from '../../assets/js/loginAnimation';

export default {
  name: 'the-register',
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
        confirmPassword: '12qwaszx',
        certificate: 'wcBMA1HFhJxxpGedAQgALQ5DMZpjTudS7hL+qVO2N1YgYqOXQRmdhXGzbGZjKudztEua1KmNB7rRYQZUWN6evslMcZV+KItxJxHsPBcQw3W+abQlXbkutMru1daCZGYioE8h3g/7aVB7EafuoAhjckSIzWdDTQvP1PsBUN8bqYuR6cl/H6ERTspktooWCBYx46C3U2VazFrkBr5qYvz18lVecMMVnbleqDwgMegFtw+cqmSKz6TndtjQhRsrtjrKLYWL+xsbtGRNublPtO9s9Xi3HB78CJrsdzh3keB19N6yE789oXxWfDdXyP1yDPXnm87ueCHHOnzJ9h5yimyXRxfcx7jdETlGzXsVQ4BMa9LgAeMSL2+uLcecU+EG0eFCZOM3IwO/oCJyG+LUysB74MvgTeAP4Ruh4LHkrjxg5nKsCQbO8XCNkNsNG+AY4tE0Ne7gT+IzOKFq4KjnPMsdYzPucxJypXNgXDFgZ+swfS7UiTa4xAVyGe4eZXnYeDNDnPQNUUV7vILpQIYHk2/7N75cyDwTTWFKbcT9xqfvTi5w/8GLwBcDA1p/HWyqweIBukvjQnwXSqK8pRE5gIa13qqVD+O8oa94eGskbqSqFw4dY4hRCsZaRx1Ty3Hg0eAS4PPhj9zgj+SFcuOxCaEcI5UZmf4bYAjG4+Z+apasN+4S4r9LJP/hMWzhuDfhVqPo5Z0uXfd0s2bHKCEyiNAg66nnI88dkHeHz1/Sfns1f7dBQBa40o/dFTMdYwMP0jVj9RAf88Qp5yCKJUoks3JUD43a6CXvWTWyBa/LMyT7ADsgHz8KESzHcX1jLiMnsWiUBXCXHiICyMr2iKlDvFDGnjBmqm6/8rDN6nEyhIP+RKIAFKDhde3EWAgVmoamiw6ijO65QuJaGVVzUD1Ouswthlu1qm4UlMQTOTGeINFxdZsEwT9HVlbEF69CXehF7oJdhSu5bqt1NI2ngcFplsGQfDw+y4+yzqMwLTi69RLjNyQy9xq/rr8IdL9B8ocr4FsAlySqovKRujibD2yS42P1meTSECie6iXH4yFf1I1C5zWq4jls5N7h4wgA',
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
      certificate: {
        required,
      },
      confirmPassword: {
        sameAs: sameAs('password'),
      },
    },
  },
  mounted() {
    // form is sent to calc dynamic animation border
    this.animationInstance = loginAnimation;
    this.animationInstance.start(this.$refs['auth-canvas'], this.$refs.register);
  },
  deactivated() {
    this.animationInstance.end();
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      // if its still pending or an error is returned do not submit
      if (this.$v.form.$pending || this.$v.form.$error) return;

      const form = { ...this.form };
      delete form.confirmPassword;
      login(form)
        .catch((error) => {
          this.showError(error); // from Mixin
        });
    },
  },
  computed: {
    computeTitle() {
      return this.$route.query.reset ? this.$t('auth.registerReset') : this.$t('auth.registerTitle');
    },
    computeButton() {
      return this.$route.query.reset ? this.$t('auth.resetSubmit') : this.$t('auth.registerSubmit');
    },
  },
};
</script>

<style lang="scss" scoped>
    @import "../../assets/css/main";
    @import "../../assets/css/auth/auth";

    /*auth link*/
    .auth__link {
        display: block;
        position: relative;
        padding-bottom: 2px;
        font: 20px 'AvantGardeBold';
        line-height: 24px;
        text-decoration: none;
        color: #fff;
    }
    /*border*/
    .border-underline:before {
        bottom: 6px;
        background: #fff;
    }
</style>
