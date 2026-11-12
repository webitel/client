<template>
  <div class="application-hub-wrap">
    <app-header />
    <nav class="application-hub">
      <div class="application-hub__background" />
      <ul class="application-hub__list">
        <li
          v-for="app of apps"
          :key="app.name"
          class="application-hub__card"
        >
          <a
            :href="app.href"
            :title="app.title"
            class="application-link"
          >
            <div class="application-link__pic">
              <img
                :alt="`${app.name}-pic`"
                :src="app.pic"
                class="application-link__pic__img"
              />
            </div>
            <div class="application-link__text-wrap">
              <div class="application-link__title-pic">
                <img
                  v-if="$breakpoint.mdAndUp"
                  :alt="app.name"
                  :src="app.titleMd"
                  class="application-link__title-pic__img application-link__title-pic__img--md"
                />
                <img
                  v-else
                  :alt="`${app.name}-title`"
                  :src="app.titleSm"
                  class="application-link__title-pic__img application-link__title-pic__img--sm"
                />
              </div>
              <h2 :class="['application-link__title', $breakpoint.smAndDown ? 'typo-body-2' : 'typo-body-1']">
                {{ app.title }}
              </h2>
            </div>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { WtApplication } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import AppHeader from '../../../app/components/app-header.vue';
import { useAvailableApps } from '../../../app/composables/useAvailableApps';
import adminPic from '../assets/img/pictures/admin.svg';
import analyticsPic from '../assets/img/pictures/analytics.svg';
import auditPic from '../assets/img/pictures/audit.svg';
import crmPic from '../assets/img/pictures/crm.svg';
import historyPic from '../assets/img/pictures/history.svg';
import supervisorPic from '../assets/img/pictures/supervisor.svg';
import wfmPic from '../assets/img/pictures/wfm.svg';
import agentPic from '../assets/img/pictures/workspace.svg';
import adminTitleMd from '../assets/img/titles/admin-md.svg';
import adminTitleSm from '../assets/img/titles/admin-sm.svg';
import agentTitleMd from '../assets/img/titles/agent-md.svg';
import agentTitleSm from '../assets/img/titles/agent-sm.svg';
import analyticsTitleMd from '../assets/img/titles/analytics-md.svg';
import analyticsTitleSm from '../assets/img/titles/analytics-sm.svg';
import auditTitleMd from '../assets/img/titles/audit-md.svg';
import auditTitleSm from '../assets/img/titles/audit-sm.svg';
import crmTitleMd from '../assets/img/titles/crm-md.svg';
import crmTitleSm from '../assets/img/titles/crm-sm.svg';
import historyTitleMd from '../assets/img/titles/history-md.svg';
import historyTitleSm from '../assets/img/titles/history-sm.svg';
import supervisorTitleMd from '../assets/img/titles/supervisor-md.svg';
import supervisorTitleSm from '../assets/img/titles/supervisor-sm.svg';
import wfmTitleMd from '../assets/img/titles/wfm-md.svg';
import wfmTitleSm from '../assets/img/titles/wfm-sm.svg';

interface AppVisuals {
	pic: string;
	titleMd: string;
	titleSm: string;
}

const appVisuals: Partial<Record<WtApplication, AppVisuals>> = {
	[WtApplication.Agent]: {
		pic: agentPic,
		titleMd: agentTitleMd,
		titleSm: agentTitleSm,
	},
	[WtApplication.Supervisor]: {
		pic: supervisorPic,
		titleMd: supervisorTitleMd,
		titleSm: supervisorTitleSm,
	},
	[WtApplication.History]: {
		pic: historyPic,
		titleMd: historyTitleMd,
		titleSm: historyTitleSm,
	},
	[WtApplication.Admin]: {
		pic: adminPic,
		titleMd: adminTitleMd,
		titleSm: adminTitleSm,
	},
	[WtApplication.Audit]: {
		pic: auditPic,
		titleMd: auditTitleMd,
		titleSm: auditTitleSm,
	},
	[WtApplication.Crm]: {
		pic: crmPic,
		titleMd: crmTitleMd,
		titleSm: crmTitleSm,
	},
	[WtApplication.Analytics]: {
		pic: analyticsPic,
		titleMd: analyticsTitleMd,
		titleSm: analyticsTitleSm,
	},
	[WtApplication.Wfm]: {
		pic: wfmPic,
		titleMd: wfmTitleMd,
		titleSm: wfmTitleSm,
	},
};

const { t } = useI18n();

const availableApps = useAvailableApps([
	WtApplication.Agent,
	WtApplication.Supervisor,
	WtApplication.History,
	WtApplication.Admin,
	WtApplication.Audit,
	WtApplication.Crm,
	WtApplication.Analytics,
	WtApplication.Wfm,
]);

const apps = computed(() =>
	availableApps.value.map((app) => ({
		...app,
		...appVisuals[app.name],
		title: t(`WtApplication.${app.name}.name`),
	})),
);
</script>

<style
  lang="scss"
  scoped
>
/* [Claude] scss only for the styleguide breakpoints: css vars don't work in @media */
@use '@webitel/styleguide/viewport-breakpoints' as *;

.application-hub-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  min-height: 100vh;
}

.application-hub {
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
}

/* [Claude] full image size, anchored top-right, so it crops correctly on smaller screens */
.application-hub__background {
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

.application-hub__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--page-wrapper-section-gap);
}

.application-hub__card {
  z-index: 1;
  box-sizing: border-box;
  width: 408px;
  height: 124px;
  transition: 0.4s;
  border-radius: var(--border-radius);
}

.application-hub__card:hover {
  background: rgba(255, 255, 255, 0.1);
}

.application-link {
  display: flex;
  align-items: center;
  padding: var(--page-wrapper-section-padding);
}

.application-link__pic {
  z-index: 1;
  filter: opacity(50%);
}

.application-link__text-wrap {
  z-index: 1;
  margin-left: var(--spacing-sm);
}

.application-hub__card:hover .application-link__pic,
.application-hub__card:hover .application-link__text-wrap {
  mix-blend-mode: soft-light;
}

.application-link__title {
  color: var(--text-on-brand-color);
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
