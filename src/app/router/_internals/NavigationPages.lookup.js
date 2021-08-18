import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import AdminSections from '@webitel/ui-sdk/src/enums/WebitelApplications/AdminSections.enum';

const nav = Object.freeze([{
  value: 'directory',
  locale: 'nav.directory.directory',
  route: '/directory',
  subNav: [{
    value: AdminSections.LICENSE,
    locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.LICENSE}`,
    route: 'license',
  }, {
    value: AdminSections.USERS,
    locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.USERS}`,
    route: 'users',
  }, {
    value: AdminSections.DEVICES,
    locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.DEVICES}`,
    route: 'devices',
  }],
},
  {
    value: 'routing',
    locale: 'nav.routing.routing',
    route: '/routing',
    subNav: [{
      value: AdminSections.FLOW,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.FLOW}`,
      route: 'flow',
    }, {
      value: AdminSections.DIALPLAN,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.DIALPLAN}`,
      route: 'dialplan',
    }, {
      value: AdminSections.GATEWAYS,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.GATEWAYS}`,
      route: 'sip-gateways',
    }, {
        value: AdminSections.CHAT_GATEWAYS,
        locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.CHAT_GATEWAYS}`,
        route: 'chat-gateways',
      }],
  }, {
    value: 'lookups',
    locale: 'nav.lookups.lookups',
    route: '/lookups',
    subNav: [{
      value: AdminSections.SKILLS,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.SKILLS}`,
      route: 'skills',
    }, {
      value: AdminSections.BUCKETS,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.BUCKETS}`,
      route: 'buckets',
    }, {
      value: AdminSections.BLACKLIST,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.BLACKLIST}`,
      route: 'blacklist',
    }, {
      value: AdminSections.REGIONS,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.REGIONS}`,
      route: 'regions',
    }, {
      value: AdminSections.CALENDARS,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.CALENDARS}`,
      route: 'calendars',
    }, {
      value: AdminSections.COMMUNICATIONS,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.COMMUNICATIONS}`,
      route: 'communications',
    }, {
      value: AdminSections.PAUSE_CAUSE,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.PAUSE_CAUSE}`,
      route: 'pause-cause',
    }, {
      value: AdminSections.MEDIA,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.MEDIA}`,
      route: 'media',
    }],
  }, {
    value: 'contact-center',
    locale: 'nav.ccenter.ccenter',
    route: '/contact-center',
    subNav: [{
      value: AdminSections.AGENTS,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.AGENTS}`,
      route: 'agents',
    }, {
      value: AdminSections.TEAMS,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.TEAMS}`,
      route: 'teams',
    }, {
      value: AdminSections.RESOURCES,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.RESOURCES}`,
      route: 'resources',
    }, {
      value: AdminSections.RESOURCE_GROUPS,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.RESOURCE_GROUPS}`,
      route: 'resource-groups',
    }, {
      value: AdminSections.QUEUES,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.QUEUES}`,
      route: 'queues',
    }],
  }, {
    value: 'integrations',
    locale: 'nav.integrations.integrations',
    route: '/integrations',
    subNav: [{
      value: AdminSections.STORAGE,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.STORAGE}`,
      route: 'storage',
    }],
  }, {
    value: 'permissions',
    locale: 'nav.permissions.permissions',
    route: '/permissions',
    subNav: [{
      value: AdminSections.ROLES,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.ROLES}`,
      route: 'roles',
    }, {
      value: AdminSections.OBJECTS,
      locale: `WebitelApplications.${WebitelApplications.ADMIN}.sections.${AdminSections.OBJECTS}`,
      route: 'objects',
    }],
  }]);

export default nav;
