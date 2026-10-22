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
		value: 'channel',
		locale: 'vocabulary.channel',
		field: 'channel',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'code',
		locale: 'objects.lookups.communications.code',
		field: 'code',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'default',
		locale: 'objects.default',
		field: 'default',
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
];
