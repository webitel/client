import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'skill',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		/** renders "min - max"; sorts on max, as it always has */
		value: 'capacity',
		locale: 'objects.lookups.skills.capacity',
		field: 'max_capacity',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'lvl',
		locale: 'objects.lookups.skills.lvl',
		field: 'lvl',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'buckets',
		locale: [
			'objects.lookups.buckets.buckets',
			2,
		],
		field: 'buckets',
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
