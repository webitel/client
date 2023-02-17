<template>
    <div class="application-hub-wrap">
        <cc-header/>
        <nav class="application-hub">
          <div class="application-hub__background"></div>
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
                                    class="application-link__pic__img application-link__pic__img"
                                    :src="app.pic.pic"
                                    :alt="`${app.name}-pic`"
                            >
                        </div>
                        <div class="application-link__text-wrap">
                            <div class="application-link__title-pic">
                                <img
                                        class="application-link__title-pic__img application-link__title-pic__img"
                                        :src="app.pic.title"
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
    import { mapGetters } from 'vuex';
    import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
    import CcHeader from '../../_reusable/app-header/components/app-header.vue';

    import admPic from '../assets/img/pictures/admin.svg';
    import admTitle from '../assets/img/titles/admin.svg';

    import agentPic from '../assets/img/pictures/workspace.svg';
    import agentTitle from '../assets/img/titles/agent.svg';

    import auditPic from '../assets/img/pictures/audit.svg';
    import auditTitle from '../assets/img/titles/audit.svg';

    import historyPic from '../assets/img/pictures/history.svg';
    import historyTitle from '../assets/img/titles/history.svg';

    import supervisorPic from '../assets/img/pictures/supervisor.svg';
    import supervisorTitle from '../assets/img/titles/supervisor.svg';

    import grafanaPic from '../assets/img/pictures/analytics.svg';
    import grafanaTitle from '../assets/img/titles/analytics.svg';

    const picAdmin = {
        pic: admPic,
        title: admTitle,
    };
    const picAgent = {
        pic: agentPic,
        title: agentTitle,
    };
    const picAudit = {
        pic: auditPic,
        title: auditTitle,
    };
    const picHistory = {
        pic: historyPic,
        title: historyTitle,
    };
    const picSupervisor = {
        pic: supervisorPic,
        title: supervisorTitle,
    };
    const picGrafana = {
        pic: grafanaPic,
        title: grafanaTitle,
    };

    export default {
        name: 'the-application-hub',
        components: { CcHeader },

        computed: {
          ...mapGetters('userinfo', {
            checkAccess: 'CHECK_APP_ACCESS',
          }),
            apps() {
                const agentApp = {
                    name: WebitelApplications.AGENT,
                    title: this.$t(`WebitelApplications.${WebitelApplications.AGENT}.name`),
                    href: process.env.VUE_APP_AGENT_URL,
                    pic: picAgent,
                };
                const supervisorApp = {
                    name: WebitelApplications.SUPERVISOR,
                    title: this.$t(`WebitelApplications.${WebitelApplications.SUPERVISOR}.name`),
                    href: process.env.VUE_APP_SUPERVISOR_URL,
                    pic: picSupervisor,
                };
                const historyApp = {
                    name: WebitelApplications.HISTORY,
                    title: this.$t(`WebitelApplications.${WebitelApplications.HISTORY}.name`),
                    href: process.env.VUE_APP_HISTORY_URL,
                    pic: picHistory,
                };

                const auditApp = {
                    name: WebitelApplications.AUDIT,
                    title: this.$t(`WebitelApplications.${WebitelApplications.AUDIT}.name`),
                    href: process.env.VUE_APP_AUDIT_URL,
                    pic: picAudit,
                };

                const adminApp = {
                    name: WebitelApplications.ADMIN,
                    title: this.$t(`WebitelApplications.${WebitelApplications.ADMIN}.name`),
                    href: process.env.VUE_APP_ADMIN_URL,
                    pic: picAdmin,
                };

                const grafanaApp = {
                    name: WebitelApplications.ANALYTICS,
                    title: this.$t(`WebitelApplications.${WebitelApplications.ANALYTICS}.name`),
                    href: process.env.VUE_APP_GRAFANA_URL,
                    pic: picGrafana,
                };

                const apps = [agentApp, supervisorApp, historyApp, adminApp];
                if (this.$config.ON_SITE) apps.push(grafanaApp);
                return apps.filter(({ name }) => this.checkAccess(name));
            },
        },
    };
</script>

<style lang="scss" scoped>
    $application-hub-bg-color: #171A2A;
    $card-bg--hover: #fff;
    $transition: 0.6s;

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
      position: relative;
      flex-grow: 1;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 0;
      background: $application-hub-bg-color;

      &__background {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 0;
        min-height: 100%;
        min-width: 100%;
        height: 1080px;
        width: 1920px;
        background: url("../assets/img/background.png") no-repeat;
        background-size: cover;
      }
    }

    // ul
    .application-hub__card {
      width: 570px;
      height: 163px;
      border-radius: var(--border-radius);
      transition: var(--transition);
      box-sizing: border-box;
    }

    // ul > li's
    .application-hub__list {
        display: grid;
        grid-template-columns: 570px 570px;
        grid-column-gap: 20px;
        grid-row-gap: 1px;
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
          transition: var(--transition);
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
          transition: var(--transition);
        }
    }

    // title text
    .application-link__title {
        @extend %typo-body-2;
        margin: 16px 0 0 10px;
    }

    // specific @hover toggled styles (default)
    .application-hub__card {
        .application-link__pic__img,
        //.application-link__title-pic__img {
        //    opacity: 1;
        //    pointer-events: auto;
        //}

        //.application-link__pic__img__light,
        //.application-link__title-pic__img__light {
        //    opacity: 0;
        //    pointer-events: none;
        //}

        .application-link__title {
            color: #fff;
        }
    }

    // specific @hover toggled styles (hovered)
    .application-hub__card:hover {
        background: $card-bg--hover;

        .application-link__pic__img,
        .application-link__title-pic__img {
            //opacity: 0;
            //pointer-events: none;
        }

        //.application-link__pic__img__light,
        //.application-link__title-pic__img__light {
        //    opacity: 1;
        //    pointer-events: auto;
        //}

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
