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
		value: 'schema',
		locale: [
			'objects.routing.flow.flow',
			1,
		],
		field: 'schema',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		field: 'enabled',
		show: true,
		sort: SortSymbols.NONE,
	},
];
