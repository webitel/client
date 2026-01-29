
import { AdminSections } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../../app/router/_internals/RouteNames.enum.js';

export default Object.freeze([
  // DIRECTORY
  { field: null, name: AdminSections.License, route: RouteNames.LICENSE }, // permissions: add
  { field: 'users', name: AdminSections.Users, route: RouteNames.USERS }, // scope: users
  {
    field: 'devices',
    name: AdminSections.Devices,
    route: RouteNames.DEVICES,
  }, // scope: devices

  // ROUTING
  { field: 'flow', name: AdminSections.Flow, route: RouteNames.FLOW }, // scope: flow
  {
    field: 'acr_routing',
    name: AdminSections.Dialplan,
    route: RouteNames.DIALPLAN,
  }, // scope: acr_routing
  {
    field: 'gateways',
    name: AdminSections.Gateways,
    route: RouteNames.GATEWAYS,
  }, // scope: gateways
  {
    field: 'acr_chat_plan',
    name: AdminSections.Chatplan,
    route: RouteNames.CHATPLAN,
  }, // scope: acr_chat_plan
  {
    field: 'chats',
    name: AdminSections.ChatGateways,
    route: RouteNames.CHAT_GATEWAYS,
  }, // scope: chats

  // LOOKUPS
  {
    field: 'dictionaries',
    name: AdminSections.Skills,
    route: RouteNames.SKILLS,
  }, // scope: dictionaries
  {
    field: 'cc_list',
    name: AdminSections.Blacklist,
    route: RouteNames.BLACKLIST,
  }, // scope: cc_list
  {
    field: 'calendars',
    name: AdminSections.Calendars,
    route: RouteNames.CALENDARS,
  }, // scope: calendars
  {
    field: 'dictionaries',
    name: AdminSections.Regions,
    route: RouteNames.REGIONS,
  }, // scope: dictionaries
  {
    field: 'dictionaries',
    name: AdminSections.Buckets,
    route: RouteNames.BUCKETS,
  },
  {
    field: 'dictionaries',
    name: AdminSections.Communications,
    route: RouteNames.COMMUNICATIONS,
  }, // scope: dictionaries
  {
    field: 'dictionaries',
    name: AdminSections.PauseCause,
    route: RouteNames.PAUSE_CAUSE,
  }, // scope: dictionaries
  { field: 'media_file', name: AdminSections.Media, route: RouteNames.MEDIA }, // scope: media_file

  // CONTACT CENTER
  { field: 'cc_agent', name: AdminSections.Agents, route: RouteNames.AGENTS }, // scope: cc_agent
  { field: 'cc_queue', name: AdminSections.Queues, route: RouteNames.QUEUES }, // scope: cc_queue
  {
    field: 'cc_queue',
    name: AdminSections.Members,
    route: RouteNames.MEMBERS,
  }, // scope: cc_queue
  {
    field: 'cc_resource_group',
    name: AdminSections.ResourceGroups,
    route: RouteNames.RESOURCE_GROUPS,
  }, // scope: cc_resource_group
  {
    field: 'cc_resource',
    name: AdminSections.Resources,
    route: RouteNames.RESOURCES,
  }, // scope: cc_resource
  { field: 'cc_team', name: AdminSections.Teams, route: RouteNames.TEAMS }, // scope: cc_team

  // INTEGRATIONS
  {
    field: 'storage_profile',
    name: AdminSections.Storage,
    route: RouteNames.STORAGE,
  }, // scope: storage_profile
  {
    field: 'cognitive_profile',
    name: AdminSections.CognitiveProfiles,
    route: RouteNames.COGNITIVE_PROFILES,
  }, // scope: cognitive_profile
  {
    field: 'email_profile',
    name: AdminSections.EmailProfiles,
    route: RouteNames.EMAIL_PROFILES,
  },
  {
    field: 'single_sign_on',
    name: AdminSections.SingleSignOn,
    route: RouteNames.SINGLE_SIGN_ON,
  },
  {
    field: 'import_template',
    name: AdminSections.ImportCsv,
    route: RouteNames.IMPORT_CSV,
  },
  {
    field: 'trigger',
    name: AdminSections.Triggers,
    route: RouteNames.TRIGGERS,
  },
  {
    field: 'schema',
    name: AdminSections.Flow,
    route: RouteNames.FLOW,
  },
  {
    field: 'files_policy',
    name: AdminSections.StoragePolicies,
    route: RouteNames.STORAGE_POLICIES,
  },

  // PERMISSIONS
  { field: null, name: AdminSections.Objects, route: RouteNames.OBJECTS }, // permissions: add
  { field: 'roles', name: AdminSections.Roles, route: RouteNames.ROLES }, // scope: roles

  // Not used in ui sections
  // it used for check if some entities have access to this object
  {
    field: 'contacts',
    name: 'contacts',
    route: null, // there is no associated section and route in Admin
  },
]);
