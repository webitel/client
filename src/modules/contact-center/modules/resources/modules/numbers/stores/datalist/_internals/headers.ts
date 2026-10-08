import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: [
			'objects.ccenter.res.numbers',
			2,
		],
		field: 'display',
		show: true,
		sort: SortSymbols.NONE,
	},
];
