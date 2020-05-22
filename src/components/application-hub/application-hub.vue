<template>
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
                        target="_blank"
                >
                    <div class="application-link__pic">
                        <img
                                class="application-link__pic__img application-link__pic__img__dark"
                                :src="app.pic.dark"
                                :alt="`${app.name}-pic`"
                        >
                        <img
                                class="application-link__pic__img application-link__pic__img__light"
                                :src="app.pic.light"
                                :alt="`${app.name}-pic`"
                        >
                    </div>
                    <div class="application-link__text-wrap">
                        <div class="application-link__title-pic">
                            <img
                                    class="application-link__title-pic__img application-link__title-pic__img__dark"
                                    :src="app.titlePic.dark"
                                    :alt="`${app.name}`"
                            >
                            <img
                                    class="application-link__title-pic__img application-link__title-pic__img__light"
                                    :src="app.titlePic.light"
                                    :alt="`${app.name}`"
                            >
                        </div>
                        <h1 class="application-link__title">{{app.title}}</h1>
                    </div>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    const picAdminDark = require('../../assets/img/application-hub/dark/admin-pic--dark.svg');
    const picAdminLight = require('../../assets/img/application-hub/light/admin-pic--light.svg');
    const picAgentDark = require('../../assets/img/application-hub/dark/agent-pic--dark.svg');
    const picAgentLight = require('../../assets/img/application-hub/light/agent-pic--light.svg');
    const picAuditDark = require('../../assets/img/application-hub/dark/audit-pic--dark.svg');
    const picAuditLight = require('../../assets/img/application-hub/light/audit-pic--light.svg');
    const picHistoryDark = require('../../assets/img/application-hub/dark/history-pic--dark.svg');
    const picHistoryLight = require('../../assets/img/application-hub/light/history-pic--light.svg');
    const picSupervisorDark = require('../../assets/img/application-hub/dark/supervisor-pic--dark.svg');
    const picSupervisorLight = require('../../assets/img/application-hub/light/supervisor-pic--light.svg');

    const titleAdminDark = require('../../assets/img/application-hub/dark/admin-title--dark.svg');
    const titleAdminLight = require('../../assets/img/application-hub/light/admin-title--light.svg');
    const titleAgentDark = require('../../assets/img/application-hub/dark/agent-title--dark.svg');
    const titleAgentLight = require('../../assets/img/application-hub/light/agent-title--light.svg');
    const titleAuditDark = require('../../assets/img/application-hub/dark/audit-title--dark.svg');
    const titleAuditLight = require('../../assets/img/application-hub/light/audit-title--light.svg');
    const titleHistoryDark = require('../../assets/img/application-hub/dark/history-title--dark.svg');
    const titleHistoryLight = require('../../assets/img/application-hub/light/history-title--light.svg');
    const titleSupervisorDark = require('../../assets/img/application-hub/dark/supervisor-title--dark.svg');
    const titleSupervisorLight = require('../../assets/img/application-hub/light/supervisor-title--light.svg');

    export default {
        name: 'the-application-hub',
        data: () => ({}),

        computed: {
            apps() {
                return [
                    {
                        name: 'agent',
                        title: this.$t('applicationHub.agent'),
                        href: process.env.VUE_APP_AGENT_URL,
                        pic: {
                            dark: picAgentDark,
                            light: picAgentLight,
                        },
                        titlePic: {
                            dark: titleAgentDark,
                            light: titleAgentLight,
                        },
                    },
                    {
                        name: 'supervisor',
                        title: this.$t('applicationHub.supervisor'),
                        href: process.env.VUE_APP_SUPERVISOR_URL,
                        pic: {
                            dark: picSupervisorDark,
                            light: picSupervisorLight,
                        },
                        titlePic: {
                            dark: titleSupervisorDark,
                            light: titleSupervisorLight,
                        },
                    },
                    {
                        name: 'history',
                        title: this.$t('applicationHub.history'),
                        href: process.env.VUE_APP_HISTORY_URL,
                        pic: {
                            dark: picHistoryDark,
                            light: picHistoryLight,
                        },
                        titlePic: {
                            dark: titleHistoryDark,
                            light: titleHistoryLight,
                        },
                    },
                    {
                        name: 'audit',
                        title: this.$t('applicationHub.audit'),
                        href: process.env.VUE_APP_AUDIT_URL,
                        pic: {
                            dark: picAuditDark,
                            light: picAuditLight,
                        },
                        titlePic: {
                            dark: titleAuditDark,
                            light: titleAuditLight,
                        },
                    },
                    {
                        name: 'admin',
                        title: this.$t('applicationHub.admin'),
                        href: process.env.VUE_APP_ADMIN_URL,
                        pic: {
                            dark: picAdminDark,
                            light: picAdminLight,
                        },
                        titlePic: {
                            dark: titleAdminDark,
                            light: titleAdminLight,
                        },
                    },
                ];
            },
        },

        methods: {},
    };
</script>

<style lang="scss" scoped>
    $application-hub-bg-color: #171A2A;
    $card-bg--hover: #fff;

    // helper class
    .typo-application-hub {
        font-family: 'Montserrat Regular', monospace;
        font-size: (12px);
        line-height: (15px);
    }

    .application-hub {
        position: relative;
        width: 100%;
        min-height: 100vh;
        /*height: 100vh;*/
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 90px 0;
        background: $application-hub-bg-color;
    }

    .application-hub__list {
        display: grid;
        grid-template-columns: 570px 570px;
        grid-column-gap: 20px;
        grid-row-gap: 1px;
        /*max-width: 1160px;*/
    }

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

    .application-link__pic {
        position: relative;
        width: 230px;
        height: 132px;

        &__img {
            position: absolute;
            transition: $transition;
        }
    }

    .application-link__text-wrap {
        margin-left: 14px;
    }

    .application-link__title-pic {
        position: relative;
        width: 100%;
        height: 42px;

        &__img {
            position: absolute;
            transition: $transition;
        }
    }

    .application-link__title {
        @extend .typo-application-hub;
        margin: 16px 0 0 10px;
    }

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

    @media screen and (max-width: 1280px) {
        .application-hub__list {
            display: grid;
            grid-template-columns: 570px;
        }
    }

    @media screen and (max-height: 610px) {
        .application-hub {
            min-height: 610px;
        }
    }
</style>
