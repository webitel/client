import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: [
			'objects.lookups.skills.skills',
			2,
		],
		field: 'skill',
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
