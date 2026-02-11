import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: [
			'objects.ccenter.queues.queues',
			2,
		],
		field: 'queue',
		sort: SortSymbols.NONE,
	},
	{
		value: 'type',
		locale: 'objects.ccenter.queues.type',
		field: 'type',
		sort: SortSymbols.NONE,
	},
	{
		value: 'count',
		locale: [
			'objects.ccenter.queues.members',
			2,
		],
		field: 'count_members',
		sort: SortSymbols.NONE,
	},
	{
		value: 'waiting',
		locale: 'objects.ccenter.queues.waiting',
		field: 'waiting_members',
		sort: SortSymbols.NONE,
	},
	{
		value: 'strategy',
		locale: 'objects.ccenter.queues.strategy',
		field: 'strategy',
		sort: SortSymbols.NONE,
	},
];
