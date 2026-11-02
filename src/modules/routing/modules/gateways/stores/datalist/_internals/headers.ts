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
		value: 'proxy',
		locale: 'objects.routing.gateways.proxy',
		field: 'proxy',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		width: '120px',
		field: 'enable',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'status',
		locale: 'objects.status',
		field: 'r_state',
		show: true,
		sort: SortSymbols.NONE,
	},
];
