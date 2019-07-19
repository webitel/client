<template>
    <main class="login">
        <!--        ANIMATION CANVAS-->
        <canvas ref="login-canvas" class="login__canvas"></canvas>
<!--        TODO: alert component-->

        <div class="logo">Webitel</div>
        <form
                class="login__form"
                ref="login"
                @submit.prevent="login"
        >
            <h2 class="login__title">{{$t('auth.loginTitle')}}</h2>
            <p class="login__subtitle">{{$t('auth.loginSubtitle')}}</p>

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

            <btn
                    class="btn form__button"
                    type="submit"
            >
                {{$t('auth.submit')}}
            </btn>
        </form>
    </main>
</template>

<script>
    import formInput from './form-input';
    import btn from './btn';
    import { required, email } from 'vuelidate/lib/validators'

    import {login, logout} from '../../api/auth';
    import errorMixin from '../../mixins/errorMixin';
    import loginAnimation from '../../assets/js/loginAnimation';

    export default {
        name: 'the-login',
        components: {
            'form-input': formInput,
            'btn': btn
        },
        mixins: [errorMixin],
        data() {
            return {
                form: {
                    username: 'srgdemon@webitel.lo',
                    password: '12qwaszx',
                }
            };
        },

        // by vuelidate
        validations: {
            form: {
                username: {
                    required,
                    email
                },
                password: {
                    required,
                }
            }
        },
        mounted() {
            // width and height are sent to calc dynamic animation border
            loginAnimation(this.$refs['login-canvas'], this.$refs.login.offsetWidth, this.$refs.login.offsetHeight);
        },
        methods: {
            login() {
                this.$v.form.$touch();
                // if its still pending or an error is returned do not submit
                if (this.$v.form.$pending || this.$v.form.$error) return;

                login(this.form)
                    .catch((error) => {
                        this.showError(error); // from Mixin
                    });
            },
            logout() {
                logout()
                    .catch((error) => {
                        this.showError(error);
                    });
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/css/main";

    .login {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        color: #fff;
        background: $login-background;
    }

    .login__canvas {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .logo {
        position: absolute;
        top: 70px;
        left: 72px;
        font: 25.5px 'AvantGardeGothicBold';

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .login__form {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 456px;
        padding: 20px;
        background: transparent;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .login__title {
        margin: 0;
        font-size: 24px;
        line-height: 24px;
    }

    .login__subtitle {
        margin: 10px 0 27px;
        font-size: 14px;
        line-height: 24px;
    }

    .form__input {
        margin-bottom: 4px;
        font-size: 14px;
    }

    .form__button {
        float: right;
        width: 124px;
        margin-top: 12px;
        margin-right: 0;
    }

    /*Extra Small Devices, Phones*/
    @media only screen and (max-width: 480px) {
        .logo {
            top: 30px;
            left: 50%;
            font-size: 36px;
            transform: translateX(-50%);
        }

        .login__form {
            width: 100%;
        }
    }
</style>
