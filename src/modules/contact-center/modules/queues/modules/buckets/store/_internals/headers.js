import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: [
			'objects.lookups.buckets.buckets',
			2,
		],
		field: 'bucket',
		sort: SortSymbols.NONE,
	},
	{
		value: 'priority',
		locale: 'objects.ccenter.queues.bucketPriority',
		field: 'priority',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'objects.ccenter.queues.state',
		field: 'disabled',
		sort: SortSymbols.NONE,
	},
];
