import { AdminSections, WtApplication } from '@webitel/ui-sdk/enums';

const nav = Object.freeze([
	{
		value: 'directory',
		locale: 'nav.directory.directory',
		route: '/directory',
		subNav: [
			{
				value: AdminSections.License,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.License}`,
				route: 'license',
			},
			{
				value: AdminSections.Users,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Users}`,
				route: 'users',
			},
			{
				value: AdminSections.Devices,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Devices}`,
				route: 'devices',
			},
		],
	},
	{
		value: 'routing',
		locale: 'nav.routing.routing',
		route: '/routing',
		subNav: [
			{
				value: AdminSections.Flow,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Flow}`,
				route: 'flow',
			},
			{
				value: AdminSections.Dialplan,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Dialplan}`,
				route: 'dialplan',
			},
			{
				value: AdminSections.Gateways,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Gateways}`,
				route: 'gateways',
			},
			{
				value: AdminSections.Chatplan,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Chatplan}`,
				route: 'chatplan',
			},
			{
				value: AdminSections.ChatGateways,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.ChatGateways}`,
				route: 'chat-gateways',
			},
		],
	},
	{
		value: 'lookups',
		locale: 'nav.lookups.lookups',
		route: '/lookups',
		subNav: [
			{
				value: AdminSections.Skills,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Skills}`,
				route: 'skills',
			},
			{
				value: AdminSections.Buckets,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Buckets}`,
				route: 'buckets',
			},
			{
				value: AdminSections.Blacklist,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Blacklist}`,
				route: 'blacklist',
			},
			{
				value: AdminSections.Regions,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Regions}`,
				route: 'regions',
			},
			{
				value: AdminSections.Calendars,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Calendars}`,
				route: 'calendars',
			},
			{
				value: AdminSections.Communications,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Communications}`,
				route: 'communications',
			},
			{
				value: AdminSections.PauseCause,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.PauseCause}`,
				route: 'pause-cause',
			},
			{
				value: AdminSections.Media,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Media}`,
				route: 'media',
			},
			/// TODO Hidden this route before be ready WFM
			// https://webitel.atlassian.net/browse/WTEL-8690
			// {
			//   value: AdminSections.ShiftTemplates,
			//   locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.ShiftTemplates}`,
			//   route: 'shift-templates',
			// },
			// {
			//   value: AdminSections.PauseTemplates,
			//   locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.PauseTemplates}`,
			//   route: 'pause-templates',
			// },
			// {
			//   value: AdminSections.WorkingConditions,
			//   locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.WorkingConditions}`,
			//   route: 'working-conditions',
			// },
			{
				value: AdminSections.QuickReplies,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.QuickReplies}`,
				route: 'quick-replies',
			},
		],
	},
	{
		value: 'contact-center',
		locale: 'nav.ccenter.ccenter',
		route: '/contact-center',
		subNav: [
			{
				value: AdminSections.Agents,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Agents}`,
				route: 'agents',
			},
			{
				value: AdminSections.Teams,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Teams}`,
				route: 'teams',
			},
			{
				value: AdminSections.Resources,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Resources}`,
				route: 'resources',
			},
			{
				value: AdminSections.ResourceGroups,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.ResourceGroups}`,
				route: 'resource-groups',
			},
			{
				value: AdminSections.Queues,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Queues}`,
				route: 'queues',
			},
		],
	},
	{
		value: 'integrations',
		locale: 'nav.integrations.integrations',
		route: '/integrations',
		subNav: [
			{
				value: AdminSections.Storage,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Storage}`,
				route: 'storage',
			},
			{
				value: AdminSections.CognitiveProfiles,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.CognitiveProfiles}`,
				route: 'cognitive-profiles',
			},
			{
				value: AdminSections.EmailProfiles,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.EmailProfiles}`,
				route: 'email-profiles',
			},
			// Note: commented out because of singleSignOn feature is not ready yet
			// {
			//   value: AdminSections.SingleSignOn,
			//   locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.SingleSignOn}`,
			//   route: 'single-sign-on',
			// },
			{
				value: AdminSections.ImportCsv,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.ImportCsv}`,
				route: 'import-csv',
			},
			{
				value: AdminSections.Triggers,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Triggers}`,
				route: 'triggers',
			},
			{
				value: AdminSections.StoragePolicies,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.StoragePolicies}`,
				route: 'storage-policies',
			},
		],
	},
	{
		value: 'permissions',
		locale: 'nav.permissions.permissions',
		route: '/permissions',
		subNav: [
			{
				value: AdminSections.Roles,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Roles}`,
				route: 'roles',
			},
			{
				value: AdminSections.Objects,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Objects}`,
				route: 'objects',
			},
		],
	},
	{
		value: 'system',
		locale: 'nav.system.system',
		route: '/system',
		subNav: [
			{
				value: AdminSections.Changelogs,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Changelogs}`,
				route: 'changelogs',
			},
			{
				value: AdminSections.Configuration,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.Configuration}`,
				route: 'configuration',
			},
			{
				value: AdminSections.GlobalVariables,
				locale: `WtApplication.${WtApplication.Admin}.sections.${AdminSections.GlobalVariables}`,
				route: 'global-variables',
			},
		],
	},
]);

export default nav;
