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
                class="form__input"
                v-model.trim="password"
                :label="$t('auth.password')"
                :v="v.password"
                :type="'password'"
        ></form-input>

        <form-input
                v-model.trim="confirmPassword"
                :label="$t('auth.confirmPassword')"
                :v="$v.confirmPassword"
                :type="'password'"
        ></form-input>

        <form-input
                v-model.trim="certificate"
                :label="$t('auth.key')"
                :v="v.certificate"
        ></form-input>

        <btn
                class="btn form__button"
                type="submit"
        >
            {{computeButton}}
        </btn>
    </form>
</template>

<script>
    import {sameAs} from 'vuelidate/lib/validators';
    import formInput from '../utils/form-input';
    import btn from '../utils/btn';
    import {mapActions} from "vuex";

    export default {
        name: 'the-register',
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
            return {
                confirmPassword: '12qwaszx',
            };
        },

        validations: {
            confirmPassword: {
                sameAs: sameAs('password'),
            },
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
            certificate: {
                get() {
                    return this.$store.state.auth.certificate
                },
                set(value) {
                    this.setProp({prop: 'certificate', value})
                }
            },

            computeTitle() {
                return this.$route.query.reset ? this.$t('auth.registerReset') : this.$t('auth.register');
            },
            computeButton() {
                return this.$route.query.reset ? this.$t('auth.resetSubmit') : this.$t('auth.registerSubmit');
            },
        },

        methods: {
            submit() {
                this.$v.form.$touch();
                // if its still pending or an error is returned do not submit
                if (this.$v.form.$pending || this.$v.form.$error) return;

                this.login();
            },

            ...mapActions('auth', {
                login: 'REGISTER',
                setProp: 'SET_PROPERTY',
            }),
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/css/auth/auth";
</style>
