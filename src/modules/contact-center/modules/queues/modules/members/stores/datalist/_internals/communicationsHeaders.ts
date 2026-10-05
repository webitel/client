import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const communicationsHeaders: DatalistTableHeader[] = [
	{
		value: 'destination',
		locale: 'objects.name',
		field: 'destination',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'type',
		locale: 'objects.ccenter.queues.type',
		field: 'type',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'priority',
		locale: 'objects.ccenter.queues.priority',
		field: 'priority',
		show: true,
		sort: SortSymbols.NONE,
	},
];
