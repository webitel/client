import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'number',
		locale: [
			'objects.lookups.blacklist.number',
			1,
		],
		field: 'number',
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
		value: 'expireAt',
		locale: 'objects.lookups.blacklist.expireAt',
		field: 'expire_at',
		show: true,
		sort: SortSymbols.NONE,
	},
];
