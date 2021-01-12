<template>
  <wt-app-header>
    <wt-navigation-bar :current-app="currentApp" :nav="nav"></wt-navigation-bar>
    <wt-app-navigator :current-app="currentApp" :apps="apps"></wt-app-navigator>
    <wt-header-actions :user="user" @settings="settings" @logout="logoutUser"/>
  </wt-app-header>
</template>

<script>
import { mapState } from 'vuex';
import { logout } from '../../../api/auth/auth';

export default {
  name: 'app-header',

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

    nav() {
      return [{
        value: 'directory',
        name: this.$t('nav.directory.directory'),
        route: '/directory',
        subNav: [{
          value: 'license',
          name: this.$t('nav.directory.license'),
          route: 'license',
        }, {
          value: 'users',
          name: this.$t('nav.directory.users'),
          route: 'users',
        }, {
          value: 'devices',
          name: this.$t('nav.directory.devices'),
          route: 'devices',
        }],
      },
        {
          value: 'routing',
          name: this.$t('nav.routing.routing'),
          route: '/routing',
          subNav: [{
            value: 'flow',
            name: this.$t('nav.routing.flow'),
            route: 'flow',
          }, {
            value: 'dialplan',
            name: this.$t('nav.routing.dialplan'),
            route: 'dialplan',
          }, {
            value: 'gateways',
            name: this.$t('nav.routing.gateways'),
            route: 'gateways',
          }],
        }, {
          value: 'lookups',
          name: this.$t('nav.lookups.lookups'),
          route: '/lookups',
          subNav: [{
            value: 'blacklist',
            name: this.$t('nav.lookups.blacklists'),
            route: 'blacklist',
          }, {
            value: 'calendars',
            name: this.$t('nav.lookups.calendars'),
            route: 'calendars',
          }, {
            value: 'communications',
            name: this.$t('nav.lookups.communications'),
            route: 'communications',
          }, {
            value: 'media',
            name: this.$t('nav.lookups.media'),
            route: 'media',
          }],
        }, {
          value: 'ccenter',
          name: this.$t('nav.ccenter.ccenter'),
          route: '/contact-center',
          subNav: [{
            value: 'agent-skills',
            name: this.$t('nav.ccenter.agentSkills'),
            route: 'skills',
          }, {
            value: 'agents',
            name: this.$t('nav.ccenter.agents'),
            route: 'agents',
          }, {
            value: 'teams',
            name: this.$t('nav.ccenter.teams'),
            route: 'teams',
          }, {
            value: 'resources',
            name: this.$t('nav.ccenter.res'),
            route: 'resources',
          }, {
            value: 'resource-groups',
            name: this.$t('nav.ccenter.resGroups'),
            route: 'resource-groups',
          }, {
            value: 'queues',
            name: this.$t('nav.ccenter.queues'),
            route: 'queues',
          }, {
            value: 'buckets',
            name: this.$t('nav.ccenter.buckets'),
            route: 'buckets',
          }],
        }, {
          value: 'integrations',
          name: this.$t('nav.integrations.integrations'),
          route: '/integrations',
          subNav: [{
            value: 'storage',
            name: this.$t('nav.administration.storage'),
            route: 'storage',
          }],
        }, {
          value: 'permissions',
          name: this.$t('nav.permissions.permissions'),
          route: '/permissions',
          subNav: [{
            value: 'roles',
            name: this.$t('nav.permissions.roles'),
            route: 'roles',
          }, {
            value: 'objects',
            name: this.$t('nav.permissions.objects'),
            route: 'objects',
          }],
        }];
    },
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
