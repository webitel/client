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
      :user="user"
      @logout="logoutUser"
      @settings="settings"
    />
  </wt-app-header>
</template>

<script>
import { WtAppHeader, WtAppNavigator, WtHeaderActions,WtLogo, WtNavigationBar } from '@webitel/ui-sdk/components';
import { WtApplication } from '@webitel/ui-sdk/enums';
import WtDarkModeSwitcher from '@webitel/ui-sdk/src/modules/Appearance/components/wt-dark-mode-switcher.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

import navMixin from '../../../../app/mixins/navMixin';
import RoutePaths from '../../../../app/router/_internals/RoutePaths';

export default {
  name: 'AppHeader',
  components: {
    WtDarkModeSwitcher,
    WtNavigationBar,
    WtLogo,
    WtAppHeader,
    WtAppNavigator,
    WtHeaderActions,
  },
  mixins: [navMixin],
  inject: ['$config'],
  data: () => ({
    RoutePaths,
    buildInfo: {
      release: process.env.npm_package_version,
      build: import.meta.env.VITE_BUILD_NUMBER,
    },
  }),
  computed: {
    ...mapState('userinfo', {
      user: (state) => state,
      currentApp: (state) => state.thisApp,
    }),
    ...mapGetters('userinfo', {
      checkAccess: 'CHECK_APP_ACCESS',
    }),
    ...mapGetters('appearance', {
      darkMode: 'DARK_MODE',
    }),
    startPageHref() {
      return import.meta.env.VITE_START_PAGE_URL;
    },
    apps() {
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
      const apps = [admin, supervisor, agent, history, audit, crm];
      if (this.$config?.ON_SITE) apps.push(grafana);
      return apps.filter(({ name }) => this.checkAccess(name));
    },
  },

  methods: {
    ...mapActions('userinfo', {
      logout: 'LOGOUT',
    }),
    settings() {
      const settingsUrl = import.meta.env.VITE_SETTINGS_URL;
      window.open(settingsUrl, '_blank', 'noopener,noreferrer');
    },

    logoutUser() {
      return this.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-dark-mode-switcher {
  margin-right: auto;
}
</style>
