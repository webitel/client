<template>
  <wt-app-header>
    <wt-navigation-bar :current-app="currentApp" :nav="nav"></wt-navigation-bar>
    <wt-app-navigator :current-app="currentApp" :apps="apps"></wt-app-navigator>
    <wt-header-actions :user="user" @settings="settings" @logout="logoutUser"/>
  </wt-app-header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { logout } from '../../../api/auth/auth';
import { Objects } from '../../../store/modules/userinfo/_internals/enums/Objects.enum';
import RouteNames from '../../../router/_internals/RouteNames.enum';

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
    ...mapGetters('userinfo', {
      hasReadAccess: 'HAS_READ_ACCESS',
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
          routeName: RouteNames.LICENSE,
        }, {
          value: Objects.USERS,
          name: this.$t('nav.directory.users'),
          route: 'users',
          routeName: RouteNames.USERS,
        }, {
          value: Objects.DEVICES,
          name: this.$t('nav.directory.devices'),
          route: 'devices',
          routeName: RouteNames.DEVICES,
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
            routeName: RouteNames.FLOW,
          }, {
            value: Objects.DIALPLAN,
            name: this.$t('nav.routing.dialplan'),
            route: 'dialplan',
            routeName: RouteNames.DIALPLAN,
          }, {
            value: Objects.GATEWAYS,
            name: this.$t('nav.routing.gateways'),
            route: 'gateways',
            routeName: RouteNames.GATEWAYS,
          }],
        }, {
          value: 'lookups',
          name: this.$t('nav.lookups.lookups'),
          route: '/lookups',
          subNav: [{
            value: Objects.BLACKLIST,
            name: this.$t('nav.lookups.blacklists'),
            route: 'blacklist',
            routeName: RouteNames.BLACKLIST,
          }, {
            value: Objects.CALENDARS,
            name: this.$t('nav.lookups.calendars'),
            route: 'calendars',
            routeName: RouteNames.CALENDARS,
          }, {
            value: Objects.COMMUNICATIONS,
            name: this.$t('nav.lookups.communications'),
            route: 'communications',
            routeName: RouteNames.COMMUNICATIONS,
          }, {
            value: Objects.MEDIA,
            name: this.$t('nav.lookups.media'),
            route: 'media',
            routeName: RouteNames.MEDIA,
          }],
        }, {
          value: 'ccenter',
          name: this.$t('nav.ccenter.ccenter'),
          route: '/contact-center',
          subNav: [{
            value: Objects.SKILLS,
            name: this.$t('nav.ccenter.agentSkills'),
            route: 'skills',
            routeName: RouteNames.SKILLS,
          }, {
            value: Objects.AGENTS,
            name: this.$t('nav.ccenter.agents'),
            route: 'agents',
            routeName: RouteNames.AGENTS,
          }, {
            value: Objects.TEAMS,
            name: this.$t('nav.ccenter.teams'),
            route: 'teams',
            routeName: RouteNames.TEAMS,
          }, {
            value: Objects.RESOURCES,
            name: this.$t('nav.ccenter.res'),
            route: 'resources',
            routeName: RouteNames.RESOURCES,
          }, {
            value: Objects.RESOURCE_GROUPS,
            name: this.$t('nav.ccenter.resGroups'),
            route: 'resource-groups',
            routeName: RouteNames.RESOURCE_GROUPS,
          }, {
            value: Objects.QUEUES,
            name: this.$t('nav.ccenter.queues'),
            route: 'queues',
            routeName: RouteNames.QUEUES,
          }, {
            value: Objects.BUCKETS,
            name: this.$t('nav.ccenter.buckets'),
            route: 'buckets',
            routeName: RouteNames.BUCKETS,
          }],
        }, {
          value: 'integrations',
          name: this.$t('nav.integrations.integrations'),
          route: '/integrations',
          subNav: [{
            value: Objects.STORAGE,
            name: this.$t('nav.administration.storage'),
            route: 'storage',
            routeName: RouteNames.STORAGE,
          }],
        }, {
          value: 'permissions',
          name: this.$t('nav.permissions.permissions'),
          route: '/permissions',
          subNav: [{
            value: Objects.ROLES,
            name: this.$t('nav.permissions.roles'),
            route: 'roles',
            routeName: RouteNames.ROLES,
          }, {
            value: Objects.OBJECTS,
            name: this.$t('nav.permissions.objects'),
            route: 'objects',
            routeName: RouteNames.OBJECTS,
          }],
        }];
      return nav.reduce((accumulator, nav) => {
        const subNav = nav.subNav.filter((subNav) => (
          this.hasReadAccess({ name: subNav.routeName })
        ));
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
