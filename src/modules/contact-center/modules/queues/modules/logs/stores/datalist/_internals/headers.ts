import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

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
	},
	{
		value: 'joinedAt',
		locale: 'objects.ccenter.queues.logs.joinedAt',
		field: 'joined_at',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'leavingAt',
		locale: 'objects.ccenter.queues.logs.leavingAt',
		field: 'leaving_at',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'offeringAt',
		locale: 'objects.ccenter.queues.logs.offeringAt',
		field: 'offering_at',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		/** derived from the joined/leaving pair, so it sorts on `joined_at` */
		value: 'duration',
		locale: 'objects.ccenter.queues.logs.duration',
		field: 'joined_at',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'viewNumber',
		locale: 'objects.ccenter.queues.logs.viewNumber',
		field: 'destination',
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
	},
];
