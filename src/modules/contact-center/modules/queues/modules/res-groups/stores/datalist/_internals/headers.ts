import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.name',
		// snake_case on purpose — `fields` goes straight to the service
		field: 'resource_group',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'communication',
		locale: 'objects.ccenter.queues.communications',
		field: 'communication',
		show: true,
		sort: SortSymbols.NONE,
	},
];
