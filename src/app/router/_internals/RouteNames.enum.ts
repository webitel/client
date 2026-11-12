export const RouteNames = {
	Auth: 'auth',
	ApplicationHub: 'application-hub',
	Home: 'home',
	Start: 'start',

	// DIRECTORY
	License: 'license',
	Users: 'users',
	Devices: 'devices',

	// ROUTING
	Flow: 'flow',
	Dialplan: 'dialplan',
	Gateways: 'gateways',
	Chatplan: 'chatplan',
	ChatGateways: 'chat-gateways',

	// LOOKUPS
	Skills: 'skills',
	Buckets: 'buckets',
	Blacklist: 'blacklists',
	Regions: 'regions',
	Calendars: 'calendars',
	Communications: 'communications',
	PauseCause: 'agent-pause-cause',
	ActivityTypes: 'activity-types',
	Media: 'media',
	QuickReplies: 'quick-replies',

	// CONTACT-CENTER
	Agents: 'agents',
	Teams: 'teams',
	Resources: 'resources',
	ResourceGroups: 'resource-groups',
	Queues: 'queues',
	Members: 'queues-members',

	// INTEGRATIONS
	Storage: 'storage',
	StoragePolicies: 'storage-policies',
	CognitiveProfiles: 'cognitive-profiles',
	EmailProfiles: 'email-profiles',
	SingleSignOn: 'single-sign-on',
	ImportCsv: 'import-csv',
	Triggers: 'triggers',

	// PERMISSIONS
	Objects: 'objects',
	Roles: 'roles',

	// SYSTEM
	Changelogs: 'changelogs',
	Configuration: 'configuration',
	GlobalVariables: 'global-variables',

	SettingsPage: 'settings',
	Page403: 'access-denied',
	Page404: 'not-found',
} as const;

export type RouteNames = (typeof RouteNames)[keyof typeof RouteNames];
