<template>
  <div class="application-hub-wrap">
    <cc-header />
    <nav :class="{ 'application-hub--sm': $breakpoint.smAndDown }" class="application-hub">
      <div class="application-hub__background" />
      <ul class="application-hub__list">
        <li v-for="(app, key) of apps" :key="key" class="application-hub__card">
          <a :href="app.href" :title="app.title" class="application-link">
            <div class="application-link__pic">
              <img :alt="`${app.name}-pic`" :src="app.pic.img" class="application-link__pic__img" />
            </div>
            <div class="application-link__text-wrap">
              <div class="application-link__title-pic">
                <img v-if="$breakpoint.mdAndUp" :alt="`${app.name}`" :src="app.pic.title.md"
                  class="application-link__title-pic__img application-link__title-pic__img--md" />
                <img v-else :alt="`${app.name}-title`" :src="app.pic.title.sm"
                  class="application-link__title-pic__img application-link__title-pic__img--sm" />
              </div>
              <h1 :class="['application-link__title', $breakpoint.smAndDown ? 'typo-body-2' : 'typo-body-1']">
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
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import { mapGetters } from 'vuex';

import CcHeader from '../../_reusable/app-header/components/app-header.vue';
import admPic from '../assets/img/pictures/admin.svg';
import grafanaPic from '../assets/img/pictures/analytics.svg';
import auditPic from '../assets/img/pictures/audit.svg';
import crmPic from '../assets/img/pictures/crm.svg';
import historyPic from '../assets/img/pictures/history.svg';
import supervisorPic from '../assets/img/pictures/supervisor.svg';
import agentPic from '../assets/img/pictures/workspace.svg';
import admTitleMd from '../assets/img/titles/admin-md.svg';
import admTitleSm from '../assets/img/titles/admin-sm.svg';
import agentTitleMd from '../assets/img/titles/agent-md.svg';
import agentTitleSm from '../assets/img/titles/agent-sm.svg';
import grafanaTitleMd from '../assets/img/titles/analytics-md.svg';
import grafanaTitleSm from '../assets/img/titles/analytics-sm.svg';
import auditTitleMd from '../assets/img/titles/audit-md.svg';
import auditTitleSm from '../assets/img/titles/audit-sm.svg';
import crmTitleMd from '../assets/img/titles/crm-md.svg';
import crmTitleSm from '../assets/img/titles/crm-sm.svg';
import historyTitleMd from '../assets/img/titles/history-md.svg';
import historyTitleSm from '../assets/img/titles/history-sm.svg';
import supervisorTitleMd from '../assets/img/titles/supervisor-md.svg';
import supervisorTitleSm from '../assets/img/titles/supervisor-sm.svg';

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
  name: 'TheApplicationHub',
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
        title: this.$t(
          `WebitelApplications.${WebitelApplications.SUPERVISOR}.name`,
        ),
        href: import.meta.env.VITE_SUPERVISOR_URL,
        pic: picSupervisor,
      };
      const historyApp = {
        name: WebitelApplications.HISTORY,
        title: this.$t(
          `WebitelApplications.${WebitelApplications.HISTORY}.name`,
        ),
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
        title: this.$t(
          `WebitelApplications.${WebitelApplications.ANALYTICS}.name`,
        ),
        href: import.meta.env.VITE_GRAFANA_URL,
        pic: picGrafana,
      };

      const crmApp = {
        name: WebitelApplications.CRM,
        title: this.$t(`WebitelApplications.${WebitelApplications.CRM}.name`),
        href: import.meta.env.VITE_CRM_URL,
        pic: picCrm,
      };

      const apps = [
        agentApp,
        supervisorApp,
        historyApp,
        adminApp,
        auditApp,
        crmApp,
      ];
      if (this.$config.ON_SITE) apps.push(grafanaApp);
      return apps.filter(({ name }) => this.checkAccess(name));
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/viewport-breakpoints' as *;

$card-bg-hover: rgba(255, 255, 255, 0.1);
$transition: 0.4s;

// main wrapper, with header and nav
.application-hub-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  min-height: 100vh;

  .cc-header {
    flex: 0 0 54px;
  }
}

.application-hub {
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  width: 100%;

  &__background {
    // full size of image and position absolute with top-left
    // fixation for correct picture cropping on smaller breakpoints
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    width: 1920px;
    min-width: 100%;
    height: 1080px;
    min-height: 100%;
    background: url('../assets/img/background.svg') no-repeat;
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
  z-index: 1;
  box-sizing: border-box;
  width: 408px;
  height: 124px;
  transition: $transition;
  border-radius: var(--border-radius);
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
  filter: opacity(50%);
}

// text pic + heading
.application-link__text-wrap {
  z-index: 1;
  margin-left: var(--spacing-sm);
}

// title text
.application-link__title {
  color: var(--text-on-brand-color);
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
    // typo-body-2 class added to template
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
