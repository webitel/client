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
		value: 'account',
		locale: 'objects.directory.devices.authId',
		field: 'account',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'user',
		locale: 'objects.user',
		field: 'user',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'objects.directory.devices.presence',
		field: 'reged',
		show: true,
		sort: SortSymbols.NONE,
	},
];
