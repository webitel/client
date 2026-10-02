import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: [
			'objects.ccenter.queues.queues',
			2,
		],
		field: 'queue',
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
		value: 'count',
		locale: [
			'objects.ccenter.queues.members',
			2,
		],
		field: 'count_members',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'waiting',
		locale: 'objects.ccenter.queues.waiting',
		field: 'waiting_members',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'strategy',
		locale: 'objects.ccenter.queues.strategy',
		field: 'strategy',
		show: true,
		sort: SortSymbols.NONE,
	},
];
