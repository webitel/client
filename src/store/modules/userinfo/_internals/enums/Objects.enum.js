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
  CALENDARS: 'calendars',                // scope: calendars
  COMMUNICATIONS: 'communications',      // scope: lookups
  MEDIA: 'media',                        // scope: media_file

  // CONTACT CENTER
  SKILLS: 'skills',                     // scope: lookups
  AGENTS: 'agents',                      // scope: cc_agent
  BUCKETS: 'buckets',                    // scope: cc_bucket
  QUEUES: 'queues',                      // scope: cc_queue
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
  { field: null, name: Objects.LICENSE, route: '' },                   // permissions: add
  { field: 'users', name: Objects.USERS, route: '' },                       // scope: users
  { field: 'devices', name: Objects.DEVICES, route: '' },                   // scope: devices

  // ROUTING
  { field: 'flow', name: Objects.FLOW, route: '' },                          // scope: flow
  { field: 'acr_routing', name: Objects.DIALPLAN, route: '' },                  // scope: acr_routing
  { field: 'gateways', name: Objects.GATEWAYS, route: '' },                  // scope: gateways

  // LOOKUPS
  { field: 'cc_list', name: Objects.BLACKLIST, route: '' },                // scope: cc_list
  { field: 'calendars', name: Objects.CALENDARS, route: '' },                // scope: calendars
  { field: 'lookups', name: Objects.COMMUNICATIONS, route: '' },      // scope: lookups
  { field: 'media_file', name: Objects.MEDIA, route: '' },                        // scope: media_file

  // CONTACT CENTER
  { field: 'lookups', name: Objects.SKILLS, route: '' },                     // scope: lookups
  { field: 'cc_agent', name: Objects.AGENTS, route: '' },                      // scope: cc_agent
  { field: 'cc_bucket', name: Objects.BUCKETS, route: '' },                    // scope: cc_bucket
  { field: 'cc_queue', name: Objects.QUEUES, route: '' },                      // scope: cc_queue
  { field: 'cc_resource_group', name: Objects.RESOURCE_GROUPS, route: '' },    // scope: cc_resource_group
  { field: 'cc_resource', name: Objects.RESOURCES, route: '' },               // scope: cc_resource
  { field: 'cc_team', name: Objects.TEAMS, route: '' },                       // scope: cc_team

  // INTEGRATIONS
  { field: 'storage_profile', name: Objects.STORAGE, route: '' },                   // scope: storage_profile

  // PERMISSIONS
  { field: null, name: Objects.OBJECTS, route: '' },                // permissions: add
  { field: 'roles', name: Objects.ROLES, route: '' },                   // scope: roles
]);
