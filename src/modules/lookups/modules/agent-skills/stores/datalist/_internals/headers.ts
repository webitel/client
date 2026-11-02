import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'description',
		locale: 'objects.description',
		field: 'description',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'totalAgents',
		locale: 'objects.lookups.skills.totalAgents',
		field: 'total_agents',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'activeAgents',
		locale: 'objects.lookups.skills.activeSkillAgents',
		field: 'active_agents',
		show: true,
		sort: SortSymbols.NONE,
	},
];
