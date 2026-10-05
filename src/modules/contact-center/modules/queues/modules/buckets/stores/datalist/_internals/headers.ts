import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: [
			'objects.lookups.buckets.buckets',
			2,
		],
		field: 'bucket',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'priority',
		locale: 'objects.ccenter.queues.bucketPriority',
		field: 'priority',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		/** rendered inverted: the column is "enabled", the field is `disabled` */
		value: 'state',
		locale: 'objects.ccenter.queues.state',
		field: 'disabled',
		show: true,
		sort: SortSymbols.NONE,
	},
];
