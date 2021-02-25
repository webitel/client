import { Objects } from './Objects.enum';

const nav = Object.freeze([{
  value: 'directory',
  locale: 'nav.directory.directory',
  route: '/directory',
  subNav: [{
    value: Objects.LICENSE,
    locale: 'nav.directory.license',
    route: 'license',
  }, {
    value: Objects.USERS,
    locale: 'nav.directory.users',
    route: 'users',
  }, {
    value: Objects.DEVICES,
    locale: 'nav.directory.devices',
    route: 'devices',
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
    }, {
      value: Objects.DIALPLAN,
      locale: 'nav.routing.dialplan',
      route: 'dialplan',
    }, {
      value: Objects.GATEWAYS,
      locale: 'nav.routing.gateways',
      route: 'gateways',
    }],
  }, {
    value: 'lookups',
    locale: 'nav.lookups.lookups',
    route: '/lookups',
    subNav: [{
      value: Objects.SKILLS,
      locale: 'nav.lookups.agentSkills',
      route: 'skills',
    }, {
      value: Objects.BUCKETS,
      locale: 'nav.lookups.buckets',
      route: 'buckets',
    }, {
      value: Objects.BLACKLIST,
      locale: 'nav.lookups.blacklists',
      route: 'blacklist',
    }, {
      value: Objects.REGIONS,
      locale: 'nav.lookups.regions',
      route: 'regions',
    }, {
      value: Objects.CALENDARS,
      locale: 'nav.lookups.calendars',
      route: 'calendars',
    }, {
      value: Objects.COMMUNICATIONS,
      locale: 'nav.lookups.communications',
      route: 'communications',
    }, {
      value: Objects.PAUSE_CAUSE,
      locale: 'nav.lookups.agentPauseCause',
      route: 'pause-cause',
    }, {
      value: Objects.MEDIA,
      locale: 'nav.lookups.media',
      route: 'media',
    }],
  }, {
    value: 'contact-center',
    locale: 'nav.ccenter.ccenter',
    route: '/contact-center',
    subNav: [{
      value: Objects.AGENTS,
      locale: 'nav.ccenter.agents',
      route: 'agents',
    }, {
      value: Objects.TEAMS,
      locale: 'nav.ccenter.teams',
      route: 'teams',
    }, {
      value: Objects.RESOURCES,
      locale: 'nav.ccenter.res',
      route: 'resources',
    }, {
      value: Objects.RESOURCE_GROUPS,
      locale: 'nav.ccenter.resGroups',
      route: 'resource-groups',
    }, {
      value: Objects.QUEUES,
      locale: 'nav.ccenter.queues',
      route: 'queues',
    }],
  }, {
    value: 'integrations',
    locale: 'nav.integrations.integrations',
    route: '/integrations',
    subNav: [{
      value: Objects.STORAGE,
      locale: 'nav.administration.storage',
      route: 'storage',
    }],
  }, {
    value: 'permissions',
    locale: 'nav.permissions.permissions',
    route: '/permissions',
    subNav: [{
      value: Objects.ROLES,
      locale: 'nav.permissions.roles',
      route: 'roles',
    }, {
      value: Objects.OBJECTS,
      locale: 'nav.permissions.objects',
      route: 'objects',
    }],
  }]);

export default nav;
