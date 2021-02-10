import { Objects } from './Objects.enum';
import RouteNames from '../../../../../router/_internals/RouteNames.enum';

const nav = Object.freeze([{
  value: 'directory',
  locale: 'nav.directory.directory',
  route: '/directory',
  subNav: [{
    value: Objects.LICENSE,
    locale: 'nav.directory.license',
    route: 'license',
    routeName: RouteNames.LICENSE,
  }, {
    value: Objects.USERS,
    locale: 'nav.directory.users',
    route: 'users',
    routeName: RouteNames.USERS,
  }, {
    value: Objects.DEVICES,
    locale: 'nav.directory.devices',
    route: 'devices',
    routeName: RouteNames.DEVICES,
  }],
},
  {
    value: 'routing',
    locale: 'nav.routing.routing',
    route: '/routing',
    subNav: [{
      value: Objects.FLOW,
      locale: 'nav.routing.flow',
      route: 'flow',
      routeName: RouteNames.FLOW,
    }, {
      value: Objects.DIALPLAN,
      locale: 'nav.routing.dialplan',
      route: 'dialplan',
      routeName: RouteNames.DIALPLAN,
    }, {
      value: Objects.GATEWAYS,
      locale: 'nav.routing.gateways',
      route: 'gateways',
      routeName: RouteNames.GATEWAYS,
    }],
  }, {
    value: 'lookups',
    locale: 'nav.lookups.lookups',
    route: '/lookups',
    subNav: [{
      value: Objects.BLACKLIST,
      locale: 'nav.lookups.blacklists',
      route: 'blacklist',
      routeName: RouteNames.BLACKLIST,
    }, {
      value: Objects.CALENDARS,
      locale: 'nav.lookups.calendars',
      route: 'calendars',
      routeName: RouteNames.CALENDARS,
    }, {
      value: Objects.COMMUNICATIONS,
      locale: 'nav.lookups.communications',
      route: 'communications',
      routeName: RouteNames.COMMUNICATIONS,
    }, {
      value: Objects.MEDIA,
      locale: 'nav.lookups.media',
      route: 'media',
      routeName: RouteNames.MEDIA,
    }],
  }, {
    value: 'contact-center',
    locale: 'nav.ccenter.ccenter',
    route: '/contact-center',
    subNav: [{
      value: Objects.SKILLS,
      locale: 'nav.ccenter.agentSkills',
      route: 'skills',
      routeName: RouteNames.SKILLS,
    }, {
      value: Objects.AGENTS,
      locale: 'nav.ccenter.agents',
      route: 'agents',
      routeName: RouteNames.AGENTS,
    }, {
      value: Objects.TEAMS,
      locale: 'nav.ccenter.teams',
      route: 'teams',
      routeName: RouteNames.TEAMS,
    }, {
      value: Objects.RESOURCES,
      locale: 'nav.ccenter.res',
      route: 'resources',
      routeName: RouteNames.RESOURCES,
    }, {
      value: Objects.RESOURCE_GROUPS,
      locale: 'nav.ccenter.resGroups',
      route: 'resource-groups',
      routeName: RouteNames.RESOURCE_GROUPS,
    }, {
      value: Objects.QUEUES,
      locale: 'nav.ccenter.queues',
      route: 'queues',
      routeName: RouteNames.QUEUES,
    }, {
      value: Objects.BUCKETS,
      locale: 'nav.ccenter.buckets',
      route: 'buckets',
      routeName: RouteNames.BUCKETS,
    }],
  }, {
    value: 'integrations',
    locale: 'nav.integrations.integrations',
    route: '/integrations',
    subNav: [{
      value: Objects.STORAGE,
      locale: 'nav.administration.storage',
      route: 'storage',
      routeName: RouteNames.STORAGE,
    }],
  }, {
    value: 'permissions',
    locale: 'nav.permissions.permissions',
    route: '/permissions',
    subNav: [{
      value: Objects.ROLES,
      locale: 'nav.permissions.roles',
      route: 'roles',
      routeName: RouteNames.ROLES,
    }, {
      value: Objects.OBJECTS,
      locale: 'nav.permissions.objects',
      route: 'objects',
      routeName: RouteNames.OBJECTS,
    }],
  }]);

export default nav;
