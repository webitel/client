import RouteNames from '../../../../../router/_internals/RouteNames.enum';

export const Objects = Object.freeze({
  // DIRECTORY
  LICENSE: 'license',                   // permissions: add
  USERS: 'users',                       // scope: users
  DEVICES: 'devices',                   // scope: devices

  // ROUTING
  FLOW: 'flow',                          // scope: flow
  DIALPLAN: 'dialplan',                  // scope: acr_routing
  GATEWAYS: 'gateways',                  // scope: gateways

  // LOOKUPS
  BLACKLIST: 'blacklist',                // scope: cc_list
  REGIONS: 'regions',                    // scope: lookups
  CALENDARS: 'calendars',                // scope: calendars
  COMMUNICATIONS: 'communications',      // scope: lookups
  PAUSE_CAUSE: 'pause-cause',            // scope: lookups
  MEDIA: 'media',                        // scope: media_file

  // CONTACT CENTER
  SKILLS: 'skills',                     // scope: lookups
  AGENTS: 'agents',                      // scope: cc_agent
  BUCKETS: 'buckets',                    // scope: cc_bucket
  QUEUES: 'queues',                      // scope: cc_queue
  MEMBERS: 'members',                    // scope: cc_queue
  RESOURCE_GROUPS: 'resource-groups',    // scope: cc_resource_group
  RESOURCES: 'resources',               // scope: cc_resource
  TEAMS: 'teams',                       // scope: cc_team

  // INTEGRATIONS
  STORAGE: 'storage',                   // scope: storage_profile

  // PERMISSIONS
  OBJECTS: 'objects',                // permissions: add
  ROLES: 'roles',                   // scope: roles
});

export const ObjectsList = Object.freeze([
  // DIRECTORY
  { field: null, name: Objects.LICENSE, route: RouteNames.LICENSE },                   // permissions: add
  { field: 'users', name: Objects.USERS, route: RouteNames.USERS },                       // scope: users
  { field: 'devices', name: Objects.DEVICES, route: RouteNames.DEVICES },                   // scope: devices

  // ROUTING
  { field: 'flow', name: Objects.FLOW, route: RouteNames.FLOW },                          // scope: flow
  { field: 'acr_routing', name: Objects.DIALPLAN, route: RouteNames.DIALPLAN },                  // scope: acr_routing
  { field: 'gateways', name: Objects.GATEWAYS, route: RouteNames.GATEWAYS },                  // scope: gateways

  // LOOKUPS
  { field: 'cc_list', name: Objects.BLACKLIST, route: RouteNames.BLACKLIST },                // scope: cc_list
  { field: 'calendars', name: Objects.CALENDARS, route: RouteNames.CALENDARS },                // scope: calendars
  { field: 'lookups', name: Objects.REGIONS, route: RouteNames.REGIONS },      // scope: lookups
  { field: 'lookups', name: Objects.COMMUNICATIONS, route: RouteNames.COMMUNICATIONS },      // scope: lookups
  { field: 'lookups', name: Objects.PAUSE_CAUSE, route: RouteNames.PAUSE_CAUSE },      // scope: lookups
  { field: 'media_file', name: Objects.MEDIA, route: RouteNames.MEDIA },                        // scope: media_file

  // CONTACT CENTER
  { field: 'lookups', name: Objects.SKILLS, route: RouteNames.SKILLS },                     // scope: lookups
  { field: 'cc_agent', name: Objects.AGENTS, route: RouteNames.AGENTS },                      // scope: cc_agent
  { field: 'cc_bucket', name: Objects.BUCKETS, route: RouteNames.BUCKETS },                    // scope: cc_bucket
  { field: 'cc_queue', name: Objects.QUEUES, route: RouteNames.QUEUES },                      // scope: cc_queue
  { field: 'cc_queue', name: Objects.MEMBERS, route: RouteNames.MEMBERS },                      // scope: cc_queue
  { field: 'cc_resource_group', name: Objects.RESOURCE_GROUPS, route: RouteNames.RESOURCE_GROUPS },    // scope: cc_resource_group
  { field: 'cc_resource', name: Objects.RESOURCES, route: RouteNames.RESOURCES },               // scope: cc_resource
  { field: 'cc_team', name: Objects.TEAMS, route: RouteNames.TEAMS },                       // scope: cc_team

  // INTEGRATIONS
  { field: 'storage_profile', name: Objects.STORAGE, route: RouteNames.STORAGE },                   // scope: storage_profile

  // PERMISSIONS
  { field: null, name: Objects.OBJECTS, route: RouteNames.OBJECTS },                // permissions: add
  { field: 'roles', name: Objects.ROLES, route: RouteNames.ROLES },                   // scope: roles
]);
