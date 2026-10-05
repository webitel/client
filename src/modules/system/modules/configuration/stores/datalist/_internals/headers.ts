import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.system.configuration.parameter',
		field: 'name',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'value',
		locale: [
			'vocabulary.values',
			1,
		],
		field: 'value',
		show: true,
		sort: SortSymbols.NONE,
	},
];
