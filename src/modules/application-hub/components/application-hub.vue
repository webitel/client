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

                const apps = [agentApp, supervisorApp, historyApp, adminApp, auditApp];
                if (this.$config.ON_SITE) apps.push(grafanaApp);
                return apps.filter(({ name }) => this.checkAccess(name));
            },
        },
    };
</script>

<style lang="scss" scoped>
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

      @media screen and (max-width: 320px) {
        height: fit-content;
        overflow: hidden;
      }
    }

    .application-hub {
      position: relative;
      flex-grow: 1;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-sm) 0;

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

      @media screen and (max-width: 320px) {
        display: block;
      }
    }

    // ul
    .application-hub__card {
      width: 408px;
      height: 124px;
      border-radius: var(--border-radius);
      transition: var(--transition);
      box-sizing: border-box;

      @media screen and (max-width: 960px) {
        width: 278px;
        height: 78px;
      }
    }

    // ul > li's
    .application-hub__list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: var(--page-wrapper-section-gap);

      @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    // a tag
    .application-link {
        display: flex;
        align-items: center;
        padding: var(--page-wrapper-section-padding);
    }

    // notebook pic wrap, with 2 abs positioned img's
    .application-link__pic {
      z-index: 1;

      &__img {
        @media screen and (max-width: 960px) {
          width: 80px;
        }
      }
    }

    // text pic + heading
    .application-link__text-wrap {
      z-index: 1;
        margin-left: var(--spacing-sm);
    }

    // title pic wrap, with 2 abs positioned img's
    .application-link__title-pic {

      &__img {
        @media screen and (max-width: 960px) {
          width: 136px;
        }
      }
    }

    // title text
    .application-link__title {
      @extend %typo-body-1;

      @media screen and (max-width: 960px) {
        //styleName: TYPOGRAPHY/body 2;
        //can`t use @extend in media
        //https://stackoverflow.com/questions/14840918/extending-selectors-from-within-media-queries-with-sass
        font-size: 12px;
        line-height: 16px;
      }
    }

    // specific @hover toggled styles (default)
    .application-hub__card {
        .application-link__title {
            color: #fff;
        }
    }

    // specific @hover toggled styles (hovered)
    .application-hub__card:hover {
      z-index: 1;
      background: #FFFFFF4D;


      .application-link__pic__img,
        .application-link__title-pic__img {
            //opacity: 0;
            //pointer-events: none;
        }
    }

    // 1280 still has desired grid template
    //@media screen and (max-width: 1279px) {
    //    .application-hub__list {
    //        display: grid;
    //        grid-template-columns: 570px;
    //    }
    //}

    // minimum height
    //@media screen and (max-height: 610px) {
    //    .application-hub-wrap {
    //        min-height: 610px;
    //    }
    //}
</style>
