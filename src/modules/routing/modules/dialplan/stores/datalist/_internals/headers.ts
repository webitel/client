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
		value: 'pattern',
		locale: 'objects.routing.dialplan.pattern',
		field: 'pattern',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'schema',
		locale: [
			'objects.routing.schema',
			1,
		],
		field: 'schema',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		field: 'disabled',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'position',
		locale: 'objects.routing.dialplan.position',
		field: 'position',
		show: true,
		sort: SortSymbols.ASC,
	},
];
