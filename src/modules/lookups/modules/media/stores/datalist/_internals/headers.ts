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
		value: 'createdAt',
		locale: 'objects.lookups.media.createdAt',
		field: 'created_at',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'format',
		locale: 'objects.lookups.media.format',
		field: 'mime_type',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'size',
		locale: 'objects.lookups.media.size',
		field: 'size',
		show: true,
		sort: SortSymbols.NONE,
	},
];
