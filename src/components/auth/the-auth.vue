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
            <div class="carousel-wrap">
                <agile
                        :nav-buttons="false"
                        :autoplay-speed="5000"
                        :speed="500"
                        pause-on-hover
                        pause-on-dots-hover
                        infinite
                        autoplay
                >
                    <div class="slide"
                         v-for="(item, key) in carouselItems"
                         :key="key"
                    >
                        <div class="item-wrap">
                            <h3 class="item-header">
                                {{item.title}}
                            </h3>
                            <p class="item-text">
                                {{item.text}}
                            </p>
                        </div>
                    </div>
                </agile>

            </div>
        </section>
    </main>
</template>

<script>
    import authLogin from './the-login';
    import authRegister from './the-register';
    import tabsComponent from '../utils/tabs-component';
    import {required, email} from 'vuelidate/lib/validators';
    import {mapState} from "vuex";
    import {VueAgile} from 'vue-agile';

    export default {
        name: 'auth',
        components: {
            authLogin,
            authRegister,
            tabsComponent,
            agile: VueAgile,
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
                carouselItems: [
                    {
                        title: this.$t('auth.carousel.title1'),
                        text: this.$t('auth.carousel.text1'),
                    },
                    {
                        title: this.$t('auth.carousel.title2'),
                        text: this.$t('auth.carousel.text2'),
                    },
                    {
                        title: this.$t('auth.carousel.title3'),
                        text: this.$t('auth.carousel.text3'),},
                    {
                        title: this.$t('auth.carousel.title4'),
                        text: this.$t('auth.carousel.text4'),},
                    {
                        title: this.$t('auth.carousel.title5'),
                        text: this.$t('auth.carousel.text5'),},
                    {
                        title: this.$t('auth.carousel.title6'),
                        text: this.$t('auth.carousel.text6'),},
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

        mounted() {

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

<style lang="scss">
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

    .carousel-wrap {
        position: relative;
        height: 340px;
        width: 540px;
        padding: 20px 40px;
        margin: 20% auto 0;

        .item-wrap {
            .item-header {
                @extend .typo-heading-lg;
                margin-bottom: 44px;
            }

            .item-text {
                @extend .typo-body-lg;
                height: 200px;
            }
        }

        .agile__dot {
            margin: 0 6px;

            button {
                width: 10px;
                height: 10px;
                background: #fff;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: block;
                font-size: 0;
                line-height: 0;
                margin: 0;
                padding: 0;
                transition-duration: .3s;
            }

            &--current button, &:hover button {
                background: $accent-color;

            }
        }
    }
</style>