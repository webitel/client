<template>
    <nav class="application-hub">
        <ul class="application-hub__list">
            <li
                    class="application-hub__card"
                    v-for="(app, key) of apps"
                    :key="key"
            >
                <a
                        class="application-hub__link"
                        :href="app.href"
                        :title="app.title"
                        target="_blank"
                >
                    <img class="application-hub__link__pic" :src="app.pic" :alt="`${app.name}-pic`">
                    <div class="application-hub__link__text-wrap">
                        <img class="application-hub__link__title-pic" :src="app.titlePic" :alt="`${app.name}`">
                        <h1 class="application-hub__link__title">{{app.title}}</h1>
                    </div>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    const picAdmin = require('../../assets/img/application-hub/dark/admin-pic--dark.svg');
    const picAgent = require('../../assets/img/application-hub/dark/agent-pic--dark.svg');
    const picAudit = require('../../assets/img/application-hub/dark/audit-pic--dark.svg');
    const picHistory = require('../../assets/img/application-hub/dark/history-pic--dark.svg');
    const picSupervisor = require('../../assets/img/application-hub/dark/supervisor-pic--dark.svg');
    const titleAdmin = require('../../assets/img/application-hub/dark/admin-title--dark.svg');
    const titleAgent = require('../../assets/img/application-hub/dark/agent-title--dark.svg');
    const titleAudit = require('../../assets/img/application-hub/dark/audit-title--dark.svg');
    const titleHistory = require('../../assets/img/application-hub/dark/history-title--dark.svg');
    const titleSupervisor = require('../../assets/img/application-hub/dark/supervisor-title--dark.svg');

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
                        pic: picAgent,
                        titlePic: titleAgent,
                    },
                    {
                        name: 'supervisor',
                        title: this.$t('applicationHub.supervisor'),
                        href: process.env.VUE_APP_SUPERVISOR_URL,
                        pic: picSupervisor,
                        titlePic: titleSupervisor,
                    },
                    {
                        name: 'history',
                        title: this.$t('applicationHub.history'),
                        href: process.env.VUE_APP_HISTORY_URL,
                        pic: picHistory,
                        titlePic: titleHistory,
                    },
                    {
                        name: 'audit',
                        title: this.$t('applicationHub.audit'),
                        href: process.env.VUE_APP_AUDIT_URL,
                        pic: picAudit,
                        titlePic: titleAudit,
                    },
                    {
                        name: 'admin',
                        title: this.$t('applicationHub.admin'),
                        href: process.env.VUE_APP_ADMIN_URL,
                        pic: picAdmin,
                        titlePic: titleAdmin,
                    },
                ];
            },
        },

        methods: {},
    };
</script>

<style lang="scss" scoped>
    $application-hub-bg-color: #171A2A;

    // helper class
    .typo-application-hub {
        font-family: 'Montserrat Regular', monospace;
        font-size: (12px);
        line-height: (15px);
    }

    .application-hub {
        position: relative;
        width: 100%;
        min-height: 610px;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
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
        padding: 16px 31px;
        border-radius: $border-radius;
        transition: $transition;
        box-sizing: border-box;

        &.active, &:hover {
            //border-color: $application-hub-border-color--hover;
        }
    }

    // a tag
    .application-hub__link {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #fff;
    }

    .application-hub__link__pic {
        /*width: 100%;*/
        /*height: 100%;*/
    }

    .application-hub__link__text-wrap {
        margin-left: 14px;
    }

    .application-hub__link__title-pic {}

    .application-hub__link__title {
        @extend .typo-application-hub;
        margin: 16px 0 0 10px;
    }

    @media screen and (max-width: 1280px) {
        .application-hub__list {
            display: grid;
            grid-template-columns: 570px;
        }
    }
</style>
