/* eslint-disable max-len, no-multi-spaces */
import AdminSections from '@webitel/ui-sdk/src/enums/WebitelApplications/AdminSections.enum';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default Object.freeze([
  // DIRECTORY
  { field: null, name: AdminSections.LICENSE, route: RouteNames.LICENSE }, // permissions: add
  { field: 'users', name: AdminSections.USERS, route: RouteNames.USERS }, // scope: users
  {
    field: 'devices',
    name: AdminSections.DEVICES,
    route: RouteNames.DEVICES,
  }, // scope: devices

  // ROUTING
  { field: 'flow', name: AdminSections.FLOW, route: RouteNames.FLOW }, // scope: flow
  {
    field: 'acr_routing',
    name: AdminSections.DIALPLAN,
    route: RouteNames.DIALPLAN,
  }, // scope: acr_routing
  {
    field: 'gateways',
    name: AdminSections.GATEWAYS,
    route: RouteNames.GATEWAYS,
  }, // scope: gateways
  {
    field: 'acr_chat_plan',
    name: AdminSections.CHATPLAN,
    route: RouteNames.CHATPLAN,
  }, // scope: acr_chat_plan
  {
    field: 'chats',
    name: AdminSections.CHAT_GATEWAYS,
    route: RouteNames.CHAT_GATEWAYS,
  }, // scope: chats

  // LOOKUPS
  {
    field: 'dictionaries',
    name: AdminSections.SKILLS,
    route: RouteNames.SKILLS,
  }, // scope: dictionaries
  {
    field: 'cc_list',
    name: AdminSections.BLACKLIST,
    route: RouteNames.BLACKLIST,
  }, // scope: cc_list
  {
    field: 'calendars',
    name: AdminSections.CALENDARS,
    route: RouteNames.CALENDARS,
  }, // scope: calendars
  {
    field: 'dictionaries',
    name: AdminSections.REGIONS,
    route: RouteNames.REGIONS,
  }, // scope: dictionaries
  {
    field: 'dictionaries',
    name: AdminSections.BUCKETS,
    route: RouteNames.BUCKETS,
  },
  {
    field: 'dictionaries',
    name: AdminSections.COMMUNICATIONS,
    route: RouteNames.COMMUNICATIONS,
  }, // scope: dictionaries
  {
    field: 'dictionaries',
    name: AdminSections.PAUSE_CAUSE,
    route: RouteNames.PAUSE_CAUSE,
  }, // scope: dictionaries
  { field: 'media_file', name: AdminSections.MEDIA, route: RouteNames.MEDIA }, // scope: media_file

  // CONTACT CENTER
  { field: 'cc_agent', name: AdminSections.AGENTS, route: RouteNames.AGENTS }, // scope: cc_agent
  { field: 'cc_queue', name: AdminSections.QUEUES, route: RouteNames.QUEUES }, // scope: cc_queue
  {
    field: 'cc_queue',
    name: AdminSections.MEMBERS,
    route: RouteNames.MEMBERS,
  }, // scope: cc_queue
  {
    field: 'cc_resource_group',
    name: AdminSections.RESOURCE_GROUPS,
    route: RouteNames.RESOURCE_GROUPS,
  }, // scope: cc_resource_group
  {
    field: 'cc_resource',
    name: AdminSections.RESOURCES,
    route: RouteNames.RESOURCES,
  }, // scope: cc_resource
  { field: 'cc_team', name: AdminSections.TEAMS, route: RouteNames.TEAMS }, // scope: cc_team

  // INTEGRATIONS
  {
    field: 'storage_profile',
    name: AdminSections.STORAGE,
    route: RouteNames.STORAGE,
  }, // scope: storage_profile
  {
    field: 'cognitive_profile',
    name: AdminSections.COGNITIVE_PROFILES,
    route: RouteNames.COGNITIVE_PROFILES,
  }, // scope: cognitive_profile
  {
    field: 'email_profile',
    name: AdminSections.EMAIL_PROFILES,
    route: RouteNames.EMAIL_PROFILES,
  },
  {
    field: 'single_sign_on',
    name: AdminSections.SINGLE_SIGN_ON,
    route: RouteNames.SINGLE_SIGN_ON,
  },
  {
    field: 'import_template',
    name: AdminSections.IMPORT_CSV,
    route: RouteNames.IMPORT_CSV,
  },
  {
    field: 'trigger',
    name: AdminSections.TRIGGERS,
    route: RouteNames.TRIGGERS,
  },
  {
    field: 'schema',
    name: AdminSections.FLOW,
    route: RouteNames.FLOW,
  },

  // PERMISSIONS
  { field: null, name: AdminSections.OBJECTS, route: RouteNames.OBJECTS }, // permissions: add
  { field: 'roles', name: AdminSections.ROLES, route: RouteNames.ROLES }, // scope: roles

  // Not used in ui sections
  // it used for check if some entities have access to this object
  {
    field: 'contacts',
    name: 'contacts',
    route: null, // there is no associated section and route in Admin
  },
]);
