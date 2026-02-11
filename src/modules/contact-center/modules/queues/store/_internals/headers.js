import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'type',
		locale: 'objects.ccenter.queues.type',
		field: 'type',
		sort: SortSymbols.NONE,
	},
	{
		value: 'activeCalls',
		locale: 'objects.ccenter.queues.activeCalls',
		field: 'active',
		sort: SortSymbols.NONE,
	},
	{
		value: 'waiting',
		locale: 'objects.ccenter.queues.waiting',
		field: 'waiting',
		sort: SortSymbols.NONE,
	},
	{
		value: 'priority',
		locale: 'objects.ccenter.queues.priority',
		field: 'priority',
		sort: SortSymbols.NONE,
	},
	{
		value: 'team',
		locale: [
			'objects.ccenter.queues.teams',
			1,
		],
		field: 'team',
		sort: SortSymbols.NONE,
	},
	{
		value: 'tags',
		locale: [
			'objects.ccenter.queues.tags',
			1,
		],
		field: 'tags',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'objects.ccenter.queues.state',
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
	{
		value: 'resourceGroups',
		locale: [
			'objects.ccenter.queues.resourceGroups',
			2,
		],
		field: 'resource_groups',
		sort: SortSymbols.NONE,
	},
	{
		value: 'resources',
		locale: [
			'objects.ccenter.queues.resources',
			2,
		],
		field: 'resources',
		sort: SortSymbols.NONE,
	},
];
