<template>
    <main class="auth">
        <notification/>
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
                        :autoplay-speed="60000"
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
                            <div class="item">
                                <h3 class="item-header">
                                    {{item.titleStart}}
                                    <strong class="item-header__strong">
                                        {{item.titleStrong}}
                                    </strong>
                                    {{item.titleEnd}}
                                </h3>
                                <p class="item-text">
                                    {{item.text}}
                                </p>
                            </div>
                            <img class="item-bg" src="../../assets/img/auth/bg1.svg" alt="pic">
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
    import Notification from "../utils/notification";

    export default {
        name: 'auth',
        components: {
            Notification,
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
                        titleStart: 'New agent',
                        titleStrong: 'group ',
                        titleEnd: 'work module',
                        text: 'The most efficient call distribution. An agent can have several skills at once for participating in different campaigns. The client is served only by professionals.',
                    },
                    {
                        titleStart: 'New agent',
                        titleStrong: 'group ',
                        titleEnd: 'work module',
                        text: 'The most efficient call distribution. An agent can have several skills at once for participating in different campaigns. The client is served only by professionals.',
                    },
                    {
                        titleStart: 'New agent',
                        titleStrong: 'group ',
                        titleEnd: 'work module',
                        text: 'The most efficient call distribution. An agent can have several skills at once for participating in different campaigns. The client is served only by professionals.',
                    },
                    {
                        titleStart: 'New agent',
                        titleStrong: 'group ',
                        titleEnd: 'work module',
                        text: 'The most efficient call distribution. An agent can have several skills at once for participating in different campaigns. The client is served only by professionals.',
                    },
                    // {
                    //     title: this.$t('auth.carousel.title2'),
                    //     text: this.$t('auth.carousel.text2'),
                    // },
                    // {
                    //     title: this.$t('auth.carousel.title3'),
                    //     text: this.$t('auth.carousel.text3'),},
                    // {
                    //     title: this.$t('auth.carousel.title4'),
                    //     text: this.$t('auth.carousel.text4'),},
                    // {
                    //     title: this.$t('auth.carousel.title5'),
                    //     text: this.$t('auth.carousel.text5'),},
                    // {
                    //     title: this.$t('auth.carousel.title6'),
                    //     text: this.$t('auth.carousel.text6'),
                    // },
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

    .auth {

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
            height: 100%;
            width: calc(100vw - 673px);
            /*padding: 60px 92px;*/

            .agile {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                height: 100%;

                &__list {
                    height: 100%;

                    .agile__track, .slide {
                        height: 100%;
                    }
                }

                &__actions {
                    position: absolute;
                    bottom: 60px;
                    left: 50%;
                    transform: translateX(-50%);
                    /*margin: 150px auto 0;*/
                    /*display: block;*/
                }
            }

            .item-wrap {
                position: relative;
                display: flex;
                flex-direction: column-reverse;
                height: 100%;
                width: 100%;

                .item {
                    display: flex;
                    margin: 0 0 228px 93px;
                }

                .item-header {
                    @extend .typo-heading-lg;

                    text-align: right;
                    width: min-content;
                    width: -moz-min-content;
                    margin: 0 46px 0 0;
                    font-family: 'EN-AvantGardeDemi', 'RU-AvantGardeDemi', sans-serif;
                    font-size: 50px;
                    line-height: 1;
                    text-transform: uppercase;
                    color: $accent-color;
                    /*margin-bottom: 44px;*/

                    &__strong {
                        display: inline-block;
                        position: relative;
                        color: #000;

                        &:before {
                            content: '';
                            position: absolute;
                            top: -20px;
                            right: -15px;
                            left: -15px;
                            bottom: -5px;
                            background: #EB5757;
                            z-index: -1;
                        }
                    }

                }

                .item-text {
                    @extend .typo-body-lg;
                    min-width: 250px;
                    width: 300px;
                    max-width: 500px;
                    max-height: 200px;
                    margin: 0;
                    font-family: 'Montserrat Medium', monospace;
                    font-size: 18px;
                    line-height: 1.8;
                }

                .item-bg {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
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
    }
</style>