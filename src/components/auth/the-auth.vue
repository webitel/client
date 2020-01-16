<template>
    <main class="auth">
        <section class="auth-form">
            <div class="logo"><img src="../../assets/img/logo-dark.svg" alt="logo"></div>
            <header class="">
                <h2 class="auth__title">{{computeTitle}}</h2>
                <p class="auth__subtitle">{{$t('auth.detailsSubtitle')}}</p>
            </header>
            <div class="auth-tab__wrap">
                <tabs-component
                        :tabs="tabs"
                        :root="$options.name"
                        :initialTab="computeInitialTab"
                        @change="currentTab = $event"
                >
                    <template slot="component" slot-scope="props">
                        <component
                                class="tabs-inner-component"
                                :is="props.currentTab"
                                :v="$v"
                        ></component>
                    </template>
                </tabs-component>
            </div>
        </section>
        <section class="auth-info">
            <div>some white text!</div>
        </section>
    </main>
</template>

<script>
    import authLogin from './the-login';
    import authRegister from './the-register';
    import tabsComponent from '../utils/tabs-component';
    import {required, email} from 'vuelidate/lib/validators';
    import {login} from '../../api/auth/auth';
    import {mapState} from "vuex";

    export default {
        name: 'auth',
        components: {
            authLogin,
            authRegister,
            tabsComponent,
        },
        data() {
            return {
                currentTab: {value: 'login'},
                tabs: [
                    {
                        text: this.$t('auth.login'),
                        value: 'login',
                    },
                    {
                        text: this.$t('auth.register'),
                        value: 'register',
                    },
                ],
            };
        },

        // by vuelidate
        validations: {
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
        },

        computed: {
            ...mapState('auth', {
                username: state => state.username,
                password: state => state.password,
                certificate: state => state.certificate,
            }),

            computeInitialTab() {
                return this.$route.query.reset ? 'register' : 'login'
            },

            computeTitle() {
                return this.currentTab.value === 'login' ?
                    this.$t('auth.login') : this.$t('auth.register')
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/css/auth/auth";

    .logo {
        margin-bottom: 68px;
    }

    .auth__title {
        @extend .typo-heading-lg;
        margin: 0 0 14px;
    }

    .auth__subtitle {
        @extend .typo-body-lg;
        margin: 0 0 38px;
    }
</style>