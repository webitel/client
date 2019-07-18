<template>
    <main class="login">
        <!--        ANIMATION CANVAS-->
        <canvas ref="login-canvas" class="login__canvas"></canvas>


        <!--                    alerts login error-->
        <!--                    <v-alert-->
        <!--                            class="error-message"-->
        <!--                            :value="error"-->
        <!--                            color="error"-->
        <!--                    >{{error}}-->
        <!--                    </v-alert>-->


        <div class="logo">Webitel</div>
        <form
                class="login__form"
                ref="login"
                v-model="valid"
                @submit.prevent="login"
        >
            <h2 class="login__title">{{$t('auth.loginTitle')}}</h2>
            <p class="login__subtitle">{{$t('auth.loginSubtitle')}}</p>

            <form-input
                    class="form__input"
                    v-model="username"
                    :label="$t('auth.user')"
                    :placeholder="$t('auth.userPlaceholder')"
                    :rules="emailRules"
                    :autofocus="true"
            ></form-input>

            <form-input
                    class="form__input"
                    v-bind:label="$t('auth.password')"
                    v-bind:placeholder="$t('auth.passwordPlaceholder')"
                    v-model="password"
                    :rules="requiredRules"
                    :password="true"
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
                username: 'srgdemon@webitel.lo',
                password: '12qwaszx',

                valid: true, // form validation trigger
                emailRules: [
                    v => !!v || this.$t('auth.validation.required'),
                    v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || this.$t('auth.validation.email'),
                ],
                requiredRules: [ // required field rules
                    v => !!v || this.$t('auth.validation.required'),
                ],
            };
        },
        mounted() {
            // width and height are sent to calc dynamic animation border
            loginAnimation(this.$refs['login-canvas'], this.$refs.login.offsetWidth, this.$refs.login.offsetHeight);
        },
        methods: {
            login() {
                login({username: this.username, password: this.password})
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
    }

    .login__form {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 416px;
        padding: 20px;
        background: transparent;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .login__title {
        margin-bottom: 10px;
        font-size: 24px;
        line-height: 24px;
    }

    .login__subtitle {
        font-size: 14px;
        line-height: 24px;
    }

    .form__input {
        margin-top: 27px;
        font-size: 14px;
    }

    .form__button {
        float: right;
        width: 124px;
        margin-top: 40px;
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

        .login {
            width: 100%;
        }
    }
</style>
