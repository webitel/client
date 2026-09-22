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
		value: 'status',
		locale: 'objects.directory.users.status',
		field: 'presence',
		width: '320px',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'username',
		locale: 'objects.directory.users.login',
		field: 'username',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'extensions',
		locale: 'objects.directory.users.extensions',
		field: 'extension',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'DnD',
		locale: 'objects.directory.users.DnD',
		field: 'dnd',
		width: '120px',
		show: true,
		sort: SortSymbols.NONE,
	},
];
