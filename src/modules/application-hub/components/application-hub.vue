<template>
    <div class="application-hub-wrap">
        <cc-header/>
        <nav class="application-hub">
            <ul class="application-hub__list">
                <li
                        class="application-hub__card"
                        v-for="(app, key) of apps"
                        :key="key"
                >
                    <a
                            class="application-link"
                            :href="app.href"
                            :title="app.title"
                    >
                        <div class="application-link__pic">
                            <img
                                    class="application-link__pic__img application-link__pic__img__dark"
                                    :src="app.pic.picDark"
                                    :alt="`${app.name}-pic`"
                            >
                            <img
                                    class="application-link__pic__img application-link__pic__img__light"
                                    :src="app.pic.picLight"
                                    :alt="`${app.name}-pic`"
                            >
                        </div>
                        <div class="application-link__text-wrap">
                            <div class="application-link__title-pic">
                                <img
                                        class="application-link__title-pic__img application-link__title-pic__img__dark"
                                        :src="app.pic.titleDark"
                                        :alt="`${app.name}`"
                                >
                                <img
                                        class="application-link__title-pic__img application-link__title-pic__img__light"
                                        :src="app.pic.titleLight"
                                        :alt="`${app.name}`"
                                >
                            </div>
                            <h1 class="application-link__title">{{app.title}}</h1>
                        </div>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import CcHeader from '../../_reusable/app-header/components/app-header.vue';

    const picAdmin = {
        picDark: require('../assets/img/dark/admin-pic--dark.svg'),
        picLight: require('../assets/img/light/admin-pic--light.svg'),
        titleDark: require('../assets/img/dark/admin-title--dark.svg'),
        titleLight: require('../assets/img/light/admin-title--light.svg'),
    };
    const picAgent = {
        picDark: require('../assets/img/dark/agent-pic--dark.svg'),
        picLight: require('../assets/img/light/agent-pic--light.svg'),
        titleDark: require('../assets/img/dark/agent-title--dark.svg'),
        titleLight: require('../assets/img/light/agent-title--light.svg'),
    };
    const picAudit = {
        picDark: require('../assets/img/dark/audit-pic--dark.svg'),
        picLight: require('../assets/img/light/audit-pic--light.svg'),
        titleDark: require('../assets/img/dark/audit-title--dark.svg'),
        titleLight: require('../assets/img/light/audit-title--light.svg'),
    };
    const picHistory = {
        picDark: require('../assets/img/dark/history-pic--dark.svg'),
        picLight: require('../assets/img/light/history-pic--light.svg'),
        titleDark: require('../assets/img/dark/history-title--dark.svg'),
        titleLight: require('../assets/img/light/history-title--light.svg'),
    };
    const picSupervisor = {
        picDark: require('../assets/img/dark/supervisor-pic--dark.svg'),
        picLight: require('../assets/img/light/supervisor-pic--light.svg'),
        titleDark: require('../assets/img/dark/supervisor-title--dark.svg'),
        titleLight: require('../assets/img/light/supervisor-title--light.svg'),
    };
    const picGrafana = {
        picDark: require('../assets/img/dark/grafana-pic--dark.svg'),
        picLight: require('../assets/img/light/grafana-pic--light.svg'),
        titleDark: require('../assets/img/dark/grafana-title--dark.svg'),
        titleLight: require('../assets/img/light/grafana-title--light.svg'),
    };

    export default {
        name: 'the-application-hub',
        components: { CcHeader },

        computed: {
            apps() {
                const agentApp = {
                    name: 'agent',
                    title: this.$t('applicationHub.agent'),
                    href: process.env.VUE_APP_AGENT_URL,
                    pic: picAgent,
                };
                const supervisorApp = {
                    name: 'supervisor',
                    title: this.$t('applicationHub.supervisor'),
                    href: process.env.VUE_APP_SUPERVISOR_URL,
                    pic: picSupervisor,
                };
                const historyApp = {
                    name: 'history',
                    title: this.$t('applicationHub.history'),
                    href: process.env.VUE_APP_HISTORY_URL,
                    pic: picHistory,
                };

                const auditApp = {
                    name: 'audit',
                    title: this.$t('applicationHub.audit'),
                    href: process.env.VUE_APP_AUDIT_URL,
                    pic: picAudit,
                };

                const adminApp = {
                    name: 'admin',
                    title: this.$t('applicationHub.admin'),
                    href: process.env.VUE_APP_ADMIN_URL,
                    pic: picAdmin,
                };

                const grafanaApp = {
                    name: 'grafana',
                    title: this.$t('applicationHub.grafana'),
                    href: process.env.VUE_APP_GRAFANA_URL,
                    pic: picGrafana,
                };

                const apps = [agentApp, supervisorApp, historyApp, auditApp, adminApp];
                if (this.$config.ON_SITE) apps.push(grafanaApp);
                return apps;
            },
        },
    };
</script>

<style lang="scss" scoped>
    $application-hub-bg-color: #171A2A;
    $card-bg--hover: #fff;
    $transition: 0.6s;

    // helper class
    .typo-application-hub {
        font-family: 'Montserrat Regular', monospace;
        font-size: (12px);
        line-height: (15px);
    }

    // main wrapper, with header and nav
    .application-hub-wrap {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        .cc-header {
            flex: 0 0 54px;
        }
    }

    .application-hub {
        flex-grow: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 0;
        background: $application-hub-bg-color;
    }

    // ul
    .application-hub__list {
        display: grid;
        grid-template-columns: 570px 570px;
        grid-column-gap: 20px;
        grid-row-gap: 1px;
    }

    // ul > li's
    .application-hub__card {
        width: 570px;
        height: 163px;
        border-radius: $border-radius;
        transition: $transition;
        box-sizing: border-box;
    }

    // a tag
    .application-link {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 16px 31px;
        color: #fff;
    }

    // notebook pic wrap, with 2 abs positioned img's
    .application-link__pic {
        position: relative;
        width: 230px;
        height: 132px;

        &__img {
            position: absolute;
            transition: $transition;
        }
    }

    // text pic + heading
    .application-link__text-wrap {
        margin-left: 14px;
    }

    // title pic wrap, with 2 abs positioned img's
    .application-link__title-pic {
        position: relative;
        width: 100%;
        height: 42px;

        &__img {
            position: absolute;
            transition: $transition;
        }
    }

    // title text
    .application-link__title {
        @extend .typo-application-hub;
        margin: 16px 0 0 10px;
    }

    // specific @hover toggled styles (default)
    .application-hub__card {
        .application-link__pic__img__dark,
        .application-link__title-pic__img__dark {
            opacity: 1;
            pointer-events: auto;
        }

        .application-link__pic__img__light,
        .application-link__title-pic__img__light {
            opacity: 0;
            pointer-events: none;
        }

        .application-link__title {
            color: #fff;
        }
    }

    // specific @hover toggled styles (hovered)
    .application-hub__card:hover {
        background: $card-bg--hover;

        .application-link__pic__img__dark,
        .application-link__title-pic__img__dark {
            opacity: 0;
            pointer-events: none;
        }

        .application-link__pic__img__light,
        .application-link__title-pic__img__light {
            opacity: 1;
            pointer-events: auto;
        }

        .application-link__title {
            color: #000;
        }
    }

    // 1280 still has desired grid template
    @media screen and (max-width: 1279px) {
        .application-hub__list {
            display: grid;
            grid-template-columns: 570px;
        }
    }

    // minimum height
    @media screen and (max-height: 610px) {
        .application-hub-wrap {
            min-height: 610px;
        }
    }
</style>
