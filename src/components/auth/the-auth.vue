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
            <div class="swiper-wrap">
                <swiper :options="swiperOpts">
                    <swiper-slide
                            v-for="(item, key) in swiperItems"
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
                    </swiper-slide>
                    <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
                </swiper>
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

    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css';

    const swiperOpts = {
        pagination: {
            el: '.swiper-pagination',
            spaceBatween: 180,
            clickable: true,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            renderBullet(index, className) {
                return `<span class="${className} swiper-pagination-bullet-custom"></span>`
            }
        }
    };

    const swiperItems = [
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non dolor erat. Quisque vitae enim ac tortor commodo sollicitudin.'
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non dolor erat. Quisque vitae enim ac tortor commodo sollicitudin.'
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non dolor erat. Quisque vitae enim ac tortor commodo sollicitudin.'
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non dolor erat. Quisque vitae enim ac tortor commodo sollicitudin.'
        },
    ];

    export default {
        name: 'auth',
        components: {
            authLogin,
            authRegister,
            tabsComponent,
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOpts,
                swiperItems,
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

    .swiper-wrap {
        position: relative;
        height: 340px;
        width: 540px;
        padding: 20px 40px;
        margin: 20% auto 0;

        .swiper-container {
            width: 100%;
            height: 100%;

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

            .swiper-pagination {
                text-align: left;
            }

            .swiper-pagination-bullet-custom {
                width: 10px;
                height: 10px;
                margin: 0 6px;
                background: #fff;
            }

            .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
                background: $accent-color;
            }
        }
    }
</style>