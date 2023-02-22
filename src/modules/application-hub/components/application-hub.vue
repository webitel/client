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
                                    class="application-link__pic__img"
                                    :src="app.pic.pic"
                                    :alt="`${app.name}-pic`"
                            >
                        </div>
                        <div class="application-link__text-wrap">
                            <div class="application-link__title-pic">
                                <img
                                  class="application-link__title-pic__img application-link__title-pic__img-medium"
                                  :src="app.pic.title.md"
                                  :alt="`${app.name}`"
                                >
                              <img
                                class="application-link__title-pic__img application-link__title-pic__img-small"
                                :src="app.pic.title.sm"
                                :alt="`${app.name}-title`"
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
    import admTitleMd from '../assets/img/titles/admin-medium.svg';
    import admTitleSm from '../assets/img/titles/admin-small.svg';

    import agentPic from '../assets/img/pictures/workspace.svg';
    import agentTitleMd from '../assets/img/titles/agent-medium.svg';
    import agentTitleSm from '../assets/img/titles/agent-small.svg';

    import auditPic from '../assets/img/pictures/audit.svg';
    import auditTitleMd from '../assets/img/titles/audit-medium.svg';
    import auditTitleSm from '../assets/img/titles/audit-small.svg';

    import historyPic from '../assets/img/pictures/history.svg';
    import historyTitleMd from '../assets/img/titles/history-medium.svg';
    import historyTitleSm from '../assets/img/titles/history-small.svg';

    import supervisorPic from '../assets/img/pictures/supervisor.svg';
    import supervisorTitleMd from '../assets/img/titles/supervisor-medium.svg';
    import supervisorTitleSm from '../assets/img/titles/supervisor-small.svg';

    import grafanaPic from '../assets/img/pictures/analytics.svg';
    import grafanaTitleMd from '../assets/img/titles/analytics-medium.svg';
    import grafanaTitleSm from '../assets/img/titles/analytics-small.svg';

    const picAdmin = {
        pic: admPic,
        title: {
          md: admTitleMd,
          sm: admTitleSm,
        }
    };
    const picAgent = {
        pic: agentPic,
        title: {
          md: agentTitleMd,
          sm: agentTitleSm,
        }
    };
    const picAudit = {
        pic: auditPic,
        title: {
          md: auditTitleMd,
          sm: auditTitleSm,
        }
    };
    const picHistory = {
        pic: historyPic,
        title: {
          md: historyTitleMd,
          sm: historyTitleSm,
        }
    };
    const picSupervisor = {
        pic: supervisorPic,
        title: {
          md: supervisorTitleMd,
          sm: supervisorTitleSm,
        }
    };
    const picGrafana = {
        pic: grafanaPic,
        title: {
          md: grafanaTitleMd,
          sm: grafanaTitleSm,
        }
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
    $card-bg-hover: rgba(255, 255, 255, 0.1);
    $transition: 0.4s;

    // main wrapper, with header and nav
    .application-hub-wrap {
        width: 100%;
        min-height: 100vh;
      height: fit-content;
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
      overflow: hidden;

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
    .application-hub__list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: var(--page-wrapper-section-gap);

      @media screen and (max-width: $viewport-xs) {
        grid-template-columns: 1fr;
        grid-gap: 0;
      }
    }


    // ul > li's
    .application-hub__card {
      width: 408px;
      height: 124px;
      border-radius: var(--border-radius);
      transition: $transition;
      box-sizing: border-box;

      @media screen and (max-width: $viewport-sm) {
        width: 278px;
        height: 78px;
      }
    }

    // a tag
    .application-link {
        display: flex;
        align-items: center;
        padding: var(--page-wrapper-section-padding);
    }

    // notebook pic wrap
    .application-link__pic {
      z-index: 1;

      &__img {
        @media screen and (max-width: $viewport-sm) {
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

      &__img-small {
        display: none;

        @media screen and (max-width: $viewport-sm) {
          display: block;
        }
      }

      &__img-medium {
        @media screen and (max-width: $viewport-sm) {
          display: none;
        }
      }

      @media screen and (max-width: $viewport-sm) {
        margin-bottom: var(--spacing-xs);
      }

      @media screen and (max-width: $viewport-xs) {
        margin-bottom: 0;
      }
    }

    // title text
    .application-link__title {
      @extend %typo-body-1;
      color: var(--main-color);

      @media screen and (max-width: $viewport-sm) {
        // @extend %typo-body-2;
        // can`t use @extend in media
        // https://stackoverflow.com/questions/14840918/extending-selectors-from-within-media-queries-with-sass
        font-size: 12px;
        line-height: 16px;
      }
    }

    // specific @hover toggled styles (hovered)
    .application-hub__card:hover {
      z-index: 1;
      background: $card-bg-hover;

      .application-link__pic {
        mix-blend-mode: soft-light;
      }

      .application-link__text-wrap {
        mix-blend-mode: soft-light;
      }
    }
</style>
