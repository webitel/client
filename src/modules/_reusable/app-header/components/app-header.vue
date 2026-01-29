<template>
  <wt-app-header>
    <wt-navigation-bar
      :current-app="currentApp"
      :dark-mode="darkMode"
      :logo-route="RoutePaths.StartPage"
      :nav="nav"
    />
    <wt-logo
      :dark-mode="darkMode"
      :logo-href="startPageHref"
    />
    <wt-dark-mode-switcher />
    <wt-app-navigator
      :apps="apps"
      :current-app="currentApp"
      :dark-mode="darkMode"
    />
    <wt-header-actions
      :build-info="buildInfo"
      :user="userInfo"
      @logout="logoutUser"
      @settings="settings"
    />
  </wt-app-header>
</template>

<script
  setup
  lang="ts"
>
import { WtAppHeader, WtAppNavigator, WtHeaderActions, WtLogo, WtNavigationBar } from '@webitel/ui-sdk/components';
import { WtApplication } from '@webitel/ui-sdk/enums';
import WtDarkModeSwitcher from '@webitel/ui-sdk/src/modules/Appearance/components/wt-dark-mode-switcher.vue';
import { storeToRefs } from 'pinia';
import { computed, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

import RoutePaths from '../../../../app/router/_internals/RoutePaths';
import NavigationPages from '../../../../app/router/_internals/NavigationPages.lookup';
import { useUserinfoStore } from '../../../userinfo/stores/userinfoStore';

const { t } = useI18n();
const store = useStore();
const config = inject<{ ON_SITE?: boolean }>('$config');

const userInfoStore = useUserinfoStore();
const { hasApplicationVisibility, logoutUser: logout } = userInfoStore;
const { userInfo } = storeToRefs(userInfoStore);

const currentApp = WtApplication.Admin;
const darkMode = computed(() => store.getters['appearance/DARK_MODE']);
const startPageHref = computed(() => import.meta.env.VITE_START_PAGE_URL);

const buildInfo = {
  release: process.env.npm_package_version,
  build: import.meta.env.VITE_BUILD_NUMBER,
};

type NavItem = {
  value: string;
  locale: string;
  route: string;
  subNav?: Array<{ value: string; locale: string; route: string }>;
};

const navWithLocale = (nav: NavItem) => ({
  ...nav,
  name: t(nav.locale),
});

const accessibleNav = computed(() => {
  return NavigationPages.filter((nav) => {
    if (nav.subNav) {
      const filteredSubNav = nav.subNav.filter((subNav) =>
        hasApplicationVisibility(subNav.value),
      );
      return filteredSubNav.length > 0;
    }
    return hasApplicationVisibility(nav.value);
  });
});

const nav = computed(() => {
  return accessibleNav.value.map((nav) => {
    if (nav.subNav) {
      return {
        ...navWithLocale(nav),
        subNav: nav.subNav
          .filter((subNav) => hasApplicationVisibility(subNav.value))
          .map((subNav) => navWithLocale(subNav)),
      };
    }
    return navWithLocale(nav);
  });
});

const apps = computed(() => {
  const agent = {
    name: WtApplication.Agent,
    href: import.meta.env.VITE_AGENT_URL,
  };
  const supervisor = {
    name: WtApplication.Supervisor,
    href: import.meta.env.VITE_SUPERVISOR_URL,
  };
  const history = {
    name: WtApplication.History,
    href: import.meta.env.VITE_HISTORY_URL,
  };
  const audit = {
    name: WtApplication.Audit,
    href: import.meta.env.VITE_AUDIT_URL,
  };
  const admin = {
    name: WtApplication.Admin,
    href: import.meta.env.VITE_ADMIN_URL,
  };
  const grafana = {
    name: WtApplication.Analytics,
    href: import.meta.env.VITE_GRAFANA_URL,
  };
  const crm = {
    name: WtApplication.Crm,
    href: import.meta.env.VITE_CRM_URL,
  };

  const allApps = [admin, supervisor, agent, history, audit, crm];
  if (config?.ON_SITE) allApps.push(grafana);
  return allApps.filter(({ name }) => hasApplicationVisibility(name));
});

function settings() {
  const settingsUrl = import.meta.env.VITE_SETTINGS_URL;
  window.open(settingsUrl, '_blank', 'noopener,noreferrer');
}

function logoutUser() {
  return logout();
}
</script>

<style
  lang="scss"
  scoped
>
.wt-dark-mode-switcher {
  margin-right: auto;
}
</style>
