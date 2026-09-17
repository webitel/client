import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { FilterOption } from '@webitel/ui-datalist/filters';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

import { filterConfigs } from '../../../configs/filtersOptions';

export const headers: DatalistTableHeader[] = [
	{
		value: 'destination',
		locale: 'objects.ccenter.queues.logs.destination',
		field: 'destination',
		show: true,
		sort: SortSymbols.NONE,
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
		value: 'bucket',
		locale: [
			'objects.lookups.buckets.buckets',
			1,
		],
		field: 'bucket',
		show: true,
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.Bucket],
	},
	{
		value: 'joinedAt',
		locale: 'objects.ccenter.queues.logs.joinedAt',
		field: 'joined_at',
		show: true,
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.JoinedAt],
	},
	{
		value: 'leavingAt',
		locale: 'objects.ccenter.queues.logs.leavingAt',
		field: 'leaving_at',
		show: true,
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.LeavingAt],
	},
	{
		value: 'offeringAt',
		locale: 'objects.ccenter.queues.logs.offeringAt',
		field: 'offering_at',
		show: true,
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.OfferingAt],
	},
	{
		/** derived from the joined/leaving pair, so it sorts on `joined_at` */
		value: 'duration',
		locale: 'objects.ccenter.queues.logs.duration',
		field: 'joined_at',
		show: true,
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.AttemptDuration],
	},
	{
		/** the number the client sees: the resource's own, not the client's */
		value: 'viewNumber',
		locale: 'objects.ccenter.queues.logs.viewNumber',
		field: 'display',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'attempts',
		locale: 'objects.ccenter.queues.logs.attempts',
		field: 'attempts',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'result',
		locale: 'objects.ccenter.queues.logs.result',
		field: 'result',
		show: true,
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.CallReportingResult],
	},
];
