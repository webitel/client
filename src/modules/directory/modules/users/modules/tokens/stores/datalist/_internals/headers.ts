import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'usage',
		locale: 'objects.directory.users.usage',
		field: 'usage',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdAt',
		locale: 'objects.createdAt',
		field: 'created_at',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdBy',
		locale: 'objects.createdBy',
		field: 'created_by',
		show: true,
		sort: SortSymbols.NONE,
	},
];
