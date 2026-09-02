import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

/**
 * WTEL-10232. `show: false` is the first-visit default, opt-in via the column
 * select. `bucket` and `timezone` omit `sort` because engine 500s on them;
 * `SortSymbols.NONE` would still be clickable.
 */
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
	},
	{
		value: 'offeringAt',
		locale: 'objects.ccenter.queues.offeringAt',
		field: 'min_offering_at',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		/** the api field stays `communications`; only the column label changed */
		value: 'destination',
		locale: 'objects.ccenter.members.communications',
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
	},
	{
		value: 'endCause',
		locale: 'objects.ccenter.queues.endCause',
		field: 'stop_cause',
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
