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
		value: 'supervisor',
		locale: [
			'objects.ccenter.agents.supervisors',
			2,
		],
		field: 'supervisor',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'objects.ccenter.agents.state',
		field: 'status',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'skills',
		locale: [
			'objects.lookups.skills.skills',
			2,
		],
		field: 'skills',
		show: true,
		sort: SortSymbols.NONE,
	},
];
