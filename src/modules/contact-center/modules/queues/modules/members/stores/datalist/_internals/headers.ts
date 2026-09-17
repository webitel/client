import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { FilterOption } from '@webitel/ui-datalist/filters';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		show: true,
		sort: SortSymbols.NONE,
		filter: FilterOption.MemberName,
	},
	{
		value: 'createdAt',
		locale: 'objects.createdAt',
		field: 'created_at',
		show: true,
		sort: SortSymbols.NONE,
		filter: FilterOption.CreatedAt,
	},
	{
		value: 'offeringAt',
		locale: 'objects.ccenter.queues.offeringAt',
		field: 'min_offering_at',
		show: true,
		sort: SortSymbols.NONE,
		filter: FilterOption.OfferingAt,
	},
	{
		value: 'destination',
		locale: [
			'objects.ccenter.queues.destination',
			2,
		],
		field: 'communications',
		show: true,
		sort: SortSymbols.NONE,
		filter: FilterOption.MemberDestination,
	},
	{
		value: 'priority',
		locale: 'objects.ccenter.queues.priority',
		field: 'priority',
		show: true,
		sort: SortSymbols.NONE,
		filter: FilterOption.MemberPriority,
	},
	{
		value: 'endCause',
		locale: 'objects.ccenter.queues.endCause',
		field: 'stop_cause',
		show: true,
		sort: SortSymbols.NONE,
		filter: FilterOption.StopCause,
	},
	{
		value: 'attempts',
		locale: 'objects.ccenter.queues.logs.attempts',
		field: 'attempts',
		show: true,
		sort: SortSymbols.NONE,
		filter: FilterOption.MemberAttempts,
	},
	{
		value: 'agent',
		locale: [
			'objects.ccenter.agents.agents',
			1,
		],
		field: 'agent',
		show: true,
		sort: SortSymbols.NONE,
		filter: FilterOption.Agent,
	},
	{
		value: 'bucket',
		locale: [
			'objects.lookups.buckets.buckets',
			1,
		],
		field: 'bucket',
		show: true,
		sort: SortSymbols.NONE,
		filter: FilterOption.Bucket,
	},
];
