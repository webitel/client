<template>
    <form
            class="auth__form"
            @submit.prevent="submit"
    >
        <form-input
                v-model.trim="username"
                :label="$t('auth.user')"
                :v="v.username"
                :autofocus="true"
        ></form-input>

        <form-input
                v-model.trim="password"
                :label="$t('auth.password')"
                :v="v.password"
                :type="'password'"
        ></form-input>

<!--        <router-link-->
<!--                class="form__reset-password"-->
<!--                :to="{ path: '/auth', query: { reset: true }}">-->
<!--            {{$t('auth.resetPasswordLink')}}-->
<!--        </router-link>-->

        <btn
                class="btn form__button"
                type="submit"
                :disabled="computeDisabled"
        >
            {{$t('auth.loginSubmit')}}
        </btn>
    </form>
</template>

<script>
    import formInput from '../utils/form-input';
    import btn from '../utils/btn';

    import {login} from '../../api/auth/auth';
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'the-login',
        components: {
            formInput,
            btn,
        },

        props: {
            v: {
                type: Object,
            }
        },

        data() {
            return {};
        },

        mounted() {
            this.resetState();
        },

        computed: {
            username: {
                get() {
                    return this.$store.state.auth.username
                },
                set(value) {
                    this.setProp({prop: 'username', value})
                }
            },
            password: {
                get() {
                    return this.$store.state.auth.password
                },
                set(value) {
                    this.setProp({prop: 'password', value})
                }
            },
            computeDisabled() {
                return this.checkValidations();
            }
        },

        methods: {
            checkValidations() {
                this.v.$touch();
                // if its still pending or an error is returned do not submit
                return this.v.$pending ||
                    this.v.$error;
            },

            submit() {
                const invalid = this.checkValidations();
                if (!invalid) this.login();

            },

            ...mapActions('auth', {
                login: 'LOGIN',
                setProp: 'SET_PROPERTY',
                resetState: 'RESET_STATE',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/css/auth/auth";

    .form__reset-password {
        @extend .typo-input-label;

        display: block;
        text-align: right;
        margin: 14px 0 28px;
        color: #000;
        text-decoration: none;
    }
</style>
