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
import { Objects } from '../../../store/modules/userinfo/_internals/enums/Objects.enum';

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
      scope: (state) => state.scope,
    }),

    nav() {
      const nav = [{
        value: 'directory',
        name: this.$t('nav.directory.directory'),
        route: '/directory',
        subNav: [{
          value: Objects.LICENSE,
          name: this.$t('nav.directory.license'),
          route: 'license',
        }, {
          value: Objects.USERS,
          name: this.$t('nav.directory.users'),
          route: 'users',
        }, {
          value: Objects.DEVICES,
          name: this.$t('nav.directory.devices'),
          route: 'devices',
        }],
      },
        {
          value: 'routing',
          name: this.$t('nav.routing.routing'),
          route: '/routing',
          subNav: [{
            value: Objects.FLOW,
            name: this.$t('nav.routing.flow'),
            route: 'flow',
          }, {
            value: Objects.DIALPLAN,
            name: this.$t('nav.routing.dialplan'),
            route: 'dialplan',
          }, {
            value: Objects.GATEWAYS,
            name: this.$t('nav.routing.gateways'),
            route: 'gateways',
          }],
        }, {
          value: 'lookups',
          name: this.$t('nav.lookups.lookups'),
          route: '/lookups',
          subNav: [{
            value: Objects.BLACKLIST,
            name: this.$t('nav.lookups.blacklists'),
            route: 'blacklist',
          }, {
            value: Objects.CALENDARS,
            name: this.$t('nav.lookups.calendars'),
            route: 'calendars',
          }, {
            value: Objects.COMMUNICATIONS,
            name: this.$t('nav.lookups.communications'),
            route: 'communications',
          }, {
            value: Objects.MEDIA,
            name: this.$t('nav.lookups.media'),
            route: 'media',
          }],
        }, {
          value: 'ccenter',
          name: this.$t('nav.ccenter.ccenter'),
          route: '/contact-center',
          subNav: [{
            value: Objects.SKILLS,
            name: this.$t('nav.ccenter.agentSkills'),
            route: 'skills',
          }, {
            value: Objects.AGENTS,
            name: this.$t('nav.ccenter.agents'),
            route: 'agents',
          }, {
            value: Objects.TEAMS,
            name: this.$t('nav.ccenter.teams'),
            route: 'teams',
          }, {
            value: Objects.RESOURCES,
            name: this.$t('nav.ccenter.res'),
            route: 'resources',
          }, {
            value: Objects.RESOURCE_GROUPS,
            name: this.$t('nav.ccenter.resGroups'),
            route: 'resource-groups',
          }, {
            value: Objects.QUEUES,
            name: this.$t('nav.ccenter.queues'),
            route: 'queues',
          }, {
            value: Objects.BUCKETS,
            name: this.$t('nav.ccenter.buckets'),
            route: 'buckets',
          }],
        }, {
          value: 'integrations',
          name: this.$t('nav.integrations.integrations'),
          route: '/integrations',
          subNav: [{
            value: Objects.STORAGE,
            name: this.$t('nav.administration.storage'),
            route: 'storage',
          }],
        }, {
          value: 'permissions',
          name: this.$t('nav.permissions.permissions'),
          route: '/permissions',
          subNav: [{
            value: Objects.ROLES,
            name: this.$t('nav.permissions.roles'),
            route: 'roles',
          }, {
            value: Objects.OBJECTS,
            name: this.$t('nav.permissions.objects'),
            route: 'objects',
          }],
        }];
      return nav.reduce((accumulator, nav) => {
        const subNav = nav.subNav.filter((subNav) => {
          const object = this.scope[subNav.value];
          return object && object.access;
        });
        if (subNav.length) {
          const newNav = { ...nav, subNav };
          return [...accumulator, newNav];
        }
        return accumulator;
      }, []);
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
