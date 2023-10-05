<template>
  <wt-app-header>
    <wt-navigation-bar
      :current-app="currentApp"
      :nav="nav"
    ></wt-navigation-bar>
    <wt-app-navigator
      :current-app="currentApp"
      :apps="apps"
    ></wt-app-navigator>
    <wt-header-actions
      :user="user"
      :build-info="buildInfo"
      @settings="settings"
      @logout="logoutUser"
    ></wt-header-actions>
  </wt-app-header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import authAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/auth';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import navMixin from '../../../../app/mixins/navMixin';
import router from '../../../../app/router/router';

export default {
  name: 'app-header',
  mixins: [navMixin],
  inject: ['$config'],
  data: () => ({
    buildInfo: {
      release: process.env.VUE_APP_PACKAGE_VERSION,
      build: process.env.VUE_APP_BUILD_NUMBER,
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
    apps() {
      const agent = {
        name: WebitelApplications.AGENT,
        href: process.env.VUE_APP_AGENT_URL,
      };
      const supervisor = {
        name: WebitelApplications.SUPERVISOR,
        href: process.env.VUE_APP_SUPERVISOR_URL,
      };
      const history = {
        name: WebitelApplications.HISTORY,
        href: process.env.VUE_APP_HISTORY_URL,
      };
      const audit = {
        name: WebitelApplications.AUDIT,
        href: process.env.VUE_APP_AUDIT_URL,
      };
      const admin = {
        name: WebitelApplications.ADMIN,
        href: process.env.VUE_APP_ADMIN_URL,
      };
      const grafana = {
        name: WebitelApplications.ANALYTICS,
        href: process.env.VUE_APP_GRAFANA_URL,
      };
      const crm = {
        name: WebitelApplications.CRM,
        href: process.env.VUE_APP_CRM_URL,
      };
      const apps = [admin, supervisor, agent, history, audit, crm];
      if (this.$config?.ON_SITE) apps.push(grafana);
      return apps.filter(({ name }) => this.checkAccess(name));
    },
  },

  methods: {
    settings() {
      this.$router.push('/settings');
    },

    async logoutUser() {
      await authAPI.logout();
      // and throw user to auth page
      return router.replace('/auth');
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-navigation-bar {
  margin-right: auto;
}
</style>
