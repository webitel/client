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
		value: 'type',
		locale: 'objects.ccenter.queues.type',
		field: 'type',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'activeCalls',
		locale: 'objects.ccenter.queues.activeCalls',
		field: 'active',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'waiting',
		locale: 'objects.ccenter.queues.waiting',
		field: 'waiting',
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
	{
		value: 'team',
		locale: [
			'objects.ccenter.queues.teams',
			1,
		],
		field: 'team',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'tags',
		locale: [
			'objects.ccenter.queues.tags',
			1,
		],
		field: 'tags',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'objects.ccenter.queues.state',
		field: 'enabled',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'resourceGroups',
		locale: [
			'objects.ccenter.queues.resourceGroups',
			2,
		],
		// snake_case on purpose — `fields` goes straight to searchQueue()
		field: 'resource_groups',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'resources',
		locale: [
			'objects.ccenter.queues.resources',
			2,
		],
		field: 'resources',
		show: true,
		sort: SortSymbols.NONE,
	},
];
