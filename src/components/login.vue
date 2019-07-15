<template>
    <v-app style="background: #212227;">
        <!--        ANIMATION CANVAS-->
        <canvas ref="login-canvas" class="login__canvas"></canvas>

        <v-container fluid class="pa-0">
            <v-layout>
                <v-flex xs12>

                    <!--                    alerts login error-->
                    <v-alert
                            class="error-message"
                            :value="error"
                            color="error"
                    >{{error}}
                    </v-alert>

                    <section class="login">
                        <h2 class="login__title">{{$t('auth.loginTitle')}}</h2>
                        <p class="login__subtitle">{{$t('auth.loginSubtitle')}}</p>
                        <v-form
                                class="form login__form"
                                v-model="valid"
                                @submit.prevent="login"
                        >
                            <v-text-field
                                    class="form__input"
                                    v-bind:label="$t('auth.user')"
                                    v-bind:placeholder="$t('auth.user')"
                                    v-model="username"
                                    :rules="emailRules"
                                    autofocus="true"
                                    color="accent"
                            ></v-text-field>
                            <v-text-field
                                    class="form__input"
                                    v-bind:label="$t('auth.password')"
                                    v-bind:placeholder="$t('auth.password')"
                                    v-model="password"
                                    :rules="requiredRules"
                                    type="password"
                                    color="accent"
                            >
                            </v-text-field>

                            <v-btn
                                    class="form__button"
                                    type="submit"
                                    color="accent"
                            >
                                {{$t('auth.submit')}}
                            </v-btn>
                        </v-form>
                    </section>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import {login} from '../api/auth';
    import errorMixin from '../mixins/errorMixin';
    import loginAnimation from '../assets/js/loginAnimation';

    export default {
        name: 'login',
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
                requiredRules: [
                    v => !!v || this.$t('auth.validation.required'),
                ],
            };
        },
        mounted() {
            loginAnimation(this.$refs['login-canvas']);
        },
        methods: {
            login() {
                login({username: this.username, password: this.password})
                    .catch((error) => {
                        this.showError(error);
                    });
            },

        },
    };
</script>

<style scoped>
    .login__canvas {
        position: relative;
        width: 100vw;
        height: 100vh;
    }

    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 416px;
        padding: 20px;
        color: #fff;
        background: #212227;
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
        margin-bottom: 26px;
        font-size: 14px;
        line-height: 24px;
    }

    .login__form {
        color: #fff;
    }

    .form__input {
        height: 48px;
        padding: 13px 16px;
        margin-bottom: 40px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 4px;
    }

    .form__input:nth-child(2) {
        margin-bottom: 16px;
    }

    .form__button {
        float: right;
        width: 124px;
        height: 48px;
        color: #000 !important;
    }

</style>
