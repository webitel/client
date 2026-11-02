import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'agent',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'team',
		locale: 'objects.team',
		field: 'team',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'capacity',
		locale: 'objects.lookups.skills.capacity',
		field: 'capacity',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'objects.lookups.skills.state',
		field: 'enabled',
		show: true,
		sort: SortSymbols.NONE,
	},
];
