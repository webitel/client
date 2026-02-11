import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'description',
		locale: 'objects.description',
		field: 'description',
		sort: SortSymbols.NONE,
	},
	{
		value: 'totalAgents',
		locale: 'objects.lookups.skills.totalAgents',
		field: 'total_agents',
		sort: SortSymbols.NONE,
	},
	{
		value: 'activeAgents',
		locale: 'objects.lookups.skills.activeSkillAgents',
		field: 'active_agents',
		sort: SortSymbols.NONE,
	},
];
