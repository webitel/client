<template>
  <wt-app-header>
    <wt-navigation-bar :current-app="currentApp" :nav="nav"></wt-navigation-bar>
    <wt-app-navigator :current-app="currentApp" :apps="apps"></wt-app-navigator>
    <wt-header-actions :user="user" @settings="settings" @logout="logoutUser"/>
  </wt-app-header>
</template>

<script>
import { mapState } from 'vuex';
import navMixin from '../../../mixins/navMixin';
import { logout } from '../../../api/auth/auth';

export default {
  name: 'app-header',
  mixins: [navMixin],
  data: () => ({
    currentApp: 'admin',
    apps: {
      agent: { href: process.env.VUE_APP_AGENT_URL },
      supervisor: { href: process.env.VUE_APP_SUPERVISOR_URL },
      history: { href: process.env.VUE_APP_HISTORY_URL },
      audit: { href: process.env.VUE_APP_AUDIT_URL },
      admin: { href: process.env.VUE_APP_ADMIN_URL },
      grafana: { href: process.env.VUE_APP_GRAFANA_URL },
    },
  }),
  computed: {
    ...mapState('userinfo', {
      user: (state) => state,
    }),
  },

  methods: {
    settings() {
      this.$router.push('/settings');
    },

    logoutUser() {
      logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-navigation-bar {
  margin-right: auto;
}
</style>
