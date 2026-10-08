import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'resource',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'priority',
		locale: 'objects.ccenter.res.priority',
		field: 'priority',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'reserveResource',
		locale: 'objects.ccenter.res.reserveResource',
		field: 'reserve_resource',
		show: true,
		sort: SortSymbols.NONE,
	},
];
