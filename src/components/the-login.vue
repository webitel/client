<template>
    <main>
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
    <section class="login" ref="login">
        <h2 class="login__title">{{$t('auth.loginTitle')}}</h2>
        <p class="login__subtitle">{{$t('auth.loginSubtitle')}}</p>
        <form
                class="form login__form"
                v-model="valid"
                @submit.prevent="login"
        >
            <!--                            <input-->
            <!--                                    class="form__input"-->
            <!--                                    v-bind:label="$t('auth.user')"-->
            <!--                                    v-bind:placeholder="$t('auth.userPlaceholder')"-->
            <!--                                    v-model="username"-->
            <!--                                    :rules="emailRules"-->
            <!--                                    :autofocus="true"-->
            <!--                                    color="accent"-->
            <!--                            ></input>-->
            <!--                            <input-->
            <!--                                    class="form__input"-->
            <!--                                    v-bind:label="$t('auth.password')"-->
            <!--                                    v-bind:placeholder="$t('auth.passwordPlaceholder')"-->
            <!--                                    v-model="password"-->
            <!--                                    :rules="requiredRules"-->
            <!--                                    type="password"-->
            <!--                                    color="accent"-->
            <!--                            >-->
            <!--                            </input>-->

            <button
                    class="btn form__button"
                    type="submit"
            >
                {{$t('auth.submit')}}
            </button>
        </form>
    </section>
    </main>
</template>

<script>
    import {login, logout} from '../api/auth';
    import errorMixin from '../mixins/errorMixin';
    import loginAnimation from '../assets/js/loginAnimation';

    export default {
        name: 'the-login',
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

<style scoped>
    .login__canvas {
        position: relative;
        width: 100vw;
        height: 100vh;
    }

    .logo {
        position: absolute;
        top: 70px;
        left: 72px;
        font: 25.5px 'AvantGardeGothicBold';
        background: #212227;
    }

    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 416px;
        padding: 20px;
        /*background: #212227;*/
        background: transparent;
        border-radius: 10px;
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

    .login__form {
        color: #fff;
    }

    .form__input {
        height: 48px;
        padding: 13px 16px;
        margin-top: 51px;
        font-size: 14px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 4px;
    }

    .form__button {
        float: right;
        width: 124px;
        margin-top: 40px;
        margin-right: 0;
    }

    /* Extra Small Devices, Phones */
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
