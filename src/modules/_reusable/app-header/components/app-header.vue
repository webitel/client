<template>
  <wt-app-header>
    <wt-navigation-bar
      v-if="isAdminAccess"
      :current-app="currentApp" :nav="nav"
    ></wt-navigation-bar>
    <wt-app-navigator :current-app="currentApp" :apps="apps"></wt-app-navigator>
    <wt-header-actions
      :user="user"
      :build-info="buildInfo"
      @settings="settings"
      @logout="logoutUser"
    />
  </wt-app-header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import navMixin from '../../../../app/mixins/navMixin';
import router from '../../../../app/router/router';
import { logout } from '../../auth/api/auth';

export default {
  name: 'app-header',
  mixins: [navMixin],
  data: () => ({
    currentApp: 'admin',
    buildInfo: {
      release: process.env.VUE_APP_PACKAGE_VERSION,
      build: process.env.VUE_APP_BUILD_NUMBER,
    },
  }),
  computed: {
    ...mapState('userinfo', {
      user: (state) => state,
    }),
    ...mapGetters('userinfo', {
      checkAccess: 'CHECK_APP_ACCESS',
    }),
    isAdminAccess() {
      return this.checkAccess('admin');
    },
    apps() {
      const agent = {
        name: 'agent',
        href: process.env.VUE_APP_AGENT_URL,
      };
      const supervisor = {
        name: 'supervisor',
        href: process.env.VUE_APP_SUPERVISOR_URL,
      };
      const history = {
        name: 'history',
        href: process.env.VUE_APP_HISTORY_URL,
      };
      const audit = {
        name: 'audit',
        href: process.env.VUE_APP_AUDIT_URL,
      };
      const admin = {
        name: 'admin',
        href: process.env.VUE_APP_ADMIN_URL,
      };
      const grafana = {
        name: 'grafana',
        href: process.env.VUE_APP_GRAFANA_URL,
      };
      const apps = [admin, supervisor, agent, history, audit];
      if (this.$config?.ON_SITE) apps.push(grafana);
      return apps.filter(({ name }) => this.checkAccess(name));
    },
  },

  methods: {
    settings() {
      this.$router.push('/settings');
    },

    async logoutUser() {
      await logout();
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
