import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { FilterOption } from '@webitel/ui-datalist/filters';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

import { filterConfigs } from '../../../configs/filtersOptions';

/** `show: false` hides by default; bucket/timezone have no `sort`, engine 500s */
export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdAt',
		locale: 'objects.createdAt',
		field: 'created_at',
		show: true,
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.CreatedAt],
	},
	{
		value: 'offeringAt',
		locale: 'objects.ccenter.queues.offeringAt',
		field: 'min_offering_at',
		show: true,
		sort: SortSymbols.NONE,
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
	},
	{
		value: 'priority',
		locale: 'objects.ccenter.queues.priority',
		field: 'priority',
		show: true,
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.MemberPriority],
	},
	{
		value: 'endCause',
		locale: 'objects.ccenter.queues.endCause',
		field: 'stop_cause',
		show: true,
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.StopCause],
	},
	{
		value: 'attempts',
		locale: 'objects.ccenter.queues.logs.attempts',
		field: 'attempts',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'bucket',
		locale: [
			'objects.lookups.buckets.buckets',
			1,
		],
		field: 'bucket',
		show: true,
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
		filter: filterConfigs[FilterOption.Agent],
	},
	{
		value: 'expireAt',
		locale: 'objects.ccenter.queues.expire',
		field: 'expire_at',
		show: false,
		sort: SortSymbols.NONE,
	},
	{
		value: 'timezone',
		locale: 'objects.ccenter.queues.timezone',
		field: 'timezone',
		show: false,
	},
];
