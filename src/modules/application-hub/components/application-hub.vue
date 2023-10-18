<template>
  <div class="application-hub-wrap">
    <cc-header />
    <nav
      class="application-hub"
      :class="{ 'application-hub--sm': $breakpoint.smAndDown}"
    >
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
                :src="app.pic.img"
                :alt="`${app.name}-pic`"
              >
            </div>
            <div class="application-link__text-wrap">
              <div class="application-link__title-pic">
                <img
                  v-if="$breakpoint.mdAndUp"
                  class="application-link__title-pic__img application-link__title-pic__img--md"
                  :src="app.pic.title.md"
                  :alt="`${app.name}`"
                >
                <img
                  v-else
                  class="application-link__title-pic__img application-link__title-pic__img--sm"
                  :src="app.pic.title.sm"
                  :alt="`${app.name}-title`"
                >
              </div>
              <h1 class="application-link__title">
                {{ app.title }}
              </h1>
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
import admTitleMd from '../assets/img/titles/admin-md.svg';
import admTitleSm from '../assets/img/titles/admin-sm.svg';

import agentPic from '../assets/img/pictures/workspace.svg';
import agentTitleMd from '../assets/img/titles/agent-md.svg';
import agentTitleSm from '../assets/img/titles/agent-sm.svg';

import auditPic from '../assets/img/pictures/audit.svg';
import auditTitleMd from '../assets/img/titles/audit-md.svg';
import auditTitleSm from '../assets/img/titles/audit-sm.svg';

import historyPic from '../assets/img/pictures/history.svg';
import historyTitleMd from '../assets/img/titles/history-md.svg';
import historyTitleSm from '../assets/img/titles/history-sm.svg';

import supervisorPic from '../assets/img/pictures/supervisor.svg';
import supervisorTitleMd from '../assets/img/titles/supervisor-md.svg';
import supervisorTitleSm from '../assets/img/titles/supervisor-sm.svg';

import grafanaPic from '../assets/img/pictures/analytics.svg';
import grafanaTitleMd from '../assets/img/titles/analytics-md.svg';
import grafanaTitleSm from '../assets/img/titles/analytics-sm.svg';

import crmPic from '../assets/img/pictures/crm.svg';
import crmTitleMd from '../assets/img/titles/crm-md.svg';
import crmTitleSm from '../assets/img/titles/crm-sm.svg';

const picAdmin = {
  img: admPic,
  title: {
    md: admTitleMd,
    sm: admTitleSm,
  },
};
const picAgent = {
  img: agentPic,
  title: {
    md: agentTitleMd,
    sm: agentTitleSm,
  },
};
const picAudit = {
  img: auditPic,
  title: {
    md: auditTitleMd,
    sm: auditTitleSm,
  },
};
const picHistory = {
  img: historyPic,
  title: {
    md: historyTitleMd,
    sm: historyTitleSm,
  },
};
const picSupervisor = {
  img: supervisorPic,
  title: {
    md: supervisorTitleMd,
    sm: supervisorTitleSm,
  },
};
const picGrafana = {
  img: grafanaPic,
  title: {
    md: grafanaTitleMd,
    sm: grafanaTitleSm,
  },
};
const picCrm = {
  img: crmPic,
  title: {
    md: crmTitleMd,
    sm: crmTitleSm,
  },
};

export default {
  name: 'the-application-hub',
  components: { CcHeader },
  inject: ['$config'],
  computed: {
    ...mapGetters('userinfo', {
      checkAccess: 'CHECK_APP_ACCESS',
    }),
    apps() {
      const agentApp = {
        name: WebitelApplications.AGENT,
        title: this.$t(`WebitelApplications.${WebitelApplications.AGENT}.name`),
        href: import.meta.env.VITE_AGENT_URL,
        pic: picAgent,
      };
      const supervisorApp = {
        name: WebitelApplications.SUPERVISOR,
        title: this.$t(`WebitelApplications.${WebitelApplications.SUPERVISOR}.name`),
        href: import.meta.env.VITE_SUPERVISOR_URL,
        pic: picSupervisor,
      };
      const historyApp = {
        name: WebitelApplications.HISTORY,
        title: this.$t(`WebitelApplications.${WebitelApplications.HISTORY}.name`),
        href: import.meta.env.VITE_HISTORY_URL,
        pic: picHistory,
      };

      const auditApp = {
        name: WebitelApplications.AUDIT,
        title: this.$t(`WebitelApplications.${WebitelApplications.AUDIT}.name`),
        href: import.meta.env.VITE_AUDIT_URL,
        pic: picAudit,
      };

      const adminApp = {
        name: WebitelApplications.ADMIN,
        title: this.$t(`WebitelApplications.${WebitelApplications.ADMIN}.name`),
        href: import.meta.env.VITE_ADMIN_URL,
        pic: picAdmin,
      };

      const grafanaApp = {
        name: WebitelApplications.ANALYTICS,
        title: this.$t(`WebitelApplications.${WebitelApplications.ANALYTICS}.name`),
        href: import.meta.env.VITE_GRAFANA_URL,
        pic: picGrafana,
      };

      const crmApp = {
        name: WebitelApplications.CRM,
        title: this.$t(`WebitelApplications.${WebitelApplications.CRM}.name`),
        href: import.meta.env.VITE_CRM_URL,
        pic: picCrm,
      };

      const apps = [agentApp, supervisorApp, historyApp, adminApp, auditApp, crmApp];
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
    // full size of image and position absolute with top-left
    // fixation for correct picture cropping on smaller breakpoints
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
    min-height: 100%;
    min-width: 100%;
    height: 1080px;
    width: 1920px;
    background: url('../assets/img/background.png') no-repeat;
    background-size: cover;
  }
}

// ul
.application-hub__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--page-wrapper-section-gap);
}

// ul > li's
.application-hub__card {
  width: 408px;
  height: 124px;
  z-index: 1;
  border-radius: var(--border-radius);
  transition: $transition;
  box-sizing: border-box;
}

// a tag
.application-link {
  display: flex;
  align-items: center;
  padding: var(--page-wrapper-section-padding);
}

// laptop pic wrap
.application-link__pic {
  z-index: 1;
}

// text pic + heading
.application-link__text-wrap {
  z-index: 1;
  margin-left: var(--spacing-sm);
}

// title text
.application-link__title {
  @extend %typo-body-1;
  color: var(--main-color);
}

// specific @hover toggled styles (hovered)
.application-hub__card:hover {
  background: $card-bg-hover;

  .application-link__pic {
    mix-blend-mode: soft-light;
  }

  .application-link__text-wrap {
    mix-blend-mode: soft-light;
  }
}

.application-hub--sm {
  // title text
  .application-link__title {
    @extend %typo-body-2;
  }
}

@media screen and (max-width: $viewport-sm) {
  .application-hub__card {
    width: 278px;
    height: 78px;
  }

  .application-link__pic__img {
    width: 80px;
  }
}

@media screen and (max-width: $viewport-xs) {
  .application-hub__list {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
}
</style>
