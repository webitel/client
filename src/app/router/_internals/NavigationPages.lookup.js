import AdminSections from '@webitel/ui-sdk/src/enums/WebitelApplications/AdminSections.enum';

const nav = Object.freeze([{
  value: 'directory',
  locale: 'nav.directory.directory',
  route: '/directory',
  subNav: [{
    value: AdminSections.LICENSE,
    locale: 'nav.directory.license',
    route: 'license',
  }, {
    value: AdminSections.USERS,
    locale: 'nav.directory.users',
    route: 'users',
  }, {
    value: AdminSections.DEVICES,
    locale: 'nav.directory.devices',
    route: 'devices',
  }],
},
  {
    value: 'routing',
    locale: 'nav.routing.routing',
    route: '/routing',
    subNav: [{
      value: AdminSections.FLOW,
      locale: 'nav.routing.flow',
      route: 'flow',
    }, {
      value: AdminSections.DIALPLAN,
      locale: 'nav.routing.dialplan',
      route: 'dialplan',
    }, {
      value: AdminSections.GATEWAYS,
      locale: 'nav.routing.gateways',
      route: 'gateways',
    }],
  }, {
    value: 'lookups',
    locale: 'nav.lookups.lookups',
    route: '/lookups',
    subNav: [{
      value: AdminSections.SKILLS,
      locale: 'nav.lookups.agentSkills',
      route: 'skills',
    }, {
      value: AdminSections.BUCKETS,
      locale: 'nav.lookups.buckets',
      route: 'buckets',
    }, {
      value: AdminSections.BLACKLIST,
      locale: 'nav.lookups.blacklists',
      route: 'blacklist',
    }, {
      value: AdminSections.REGIONS,
      locale: 'nav.lookups.regions',
      route: 'regions',
    }, {
      value: AdminSections.CALENDARS,
      locale: 'nav.lookups.calendars',
      route: 'calendars',
    }, {
      value: AdminSections.COMMUNICATIONS,
      locale: 'nav.lookups.communications',
      route: 'communications',
    }, {
      value: AdminSections.PAUSE_CAUSE,
      locale: 'nav.lookups.agentPauseCause',
      route: 'pause-cause',
    }, {
      value: AdminSections.MEDIA,
      locale: 'nav.lookups.media',
      route: 'media',
    }],
  }, {
    value: 'contact-center',
    locale: 'nav.ccenter.ccenter',
    route: '/contact-center',
    subNav: [{
      value: AdminSections.AGENTS,
      locale: 'nav.ccenter.agents',
      route: 'agents',
    }, {
      value: AdminSections.TEAMS,
      locale: 'nav.ccenter.teams',
      route: 'teams',
    }, {
      value: AdminSections.RESOURCES,
      locale: 'nav.ccenter.res',
      route: 'resources',
    }, {
      value: AdminSections.RESOURCE_GROUPS,
      locale: 'nav.ccenter.resGroups',
      route: 'resource-groups',
    }, {
      value: AdminSections.QUEUES,
      locale: 'nav.ccenter.queues',
      route: 'queues',
    }],
  }, {
    value: 'integrations',
    locale: 'nav.integrations.integrations',
    route: '/integrations',
    subNav: [{
      value: AdminSections.STORAGE,
      locale: 'nav.administration.storage',
      route: 'storage',
    }],
  }, {
    value: 'permissions',
    locale: 'nav.permissions.permissions',
    route: '/permissions',
    subNav: [{
      value: AdminSections.ROLES,
      locale: 'nav.permissions.roles',
      route: 'roles',
    }, {
      value: AdminSections.OBJECTS,
      locale: 'nav.permissions.objects',
      route: 'objects',
    }],
  }]);

export default nav;
