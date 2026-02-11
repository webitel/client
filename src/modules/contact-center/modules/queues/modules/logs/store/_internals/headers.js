import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'destination',
		locale: 'objects.ccenter.queues.logs.destination',
		field: 'destination',
		sort: SortSymbols.NONE,
	},
	{
		value: 'agent',
		locale: [
			'objects.ccenter.agents.agents',
			1,
		],
		field: 'agent',
		sort: SortSymbols.NONE,
	},
	{
		value: 'joinedAt',
		locale: 'objects.ccenter.queues.logs.joinedAt',
		field: 'joined_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'leavingAt',
		locale: 'objects.ccenter.queues.logs.leavingAt',
		field: 'leaving_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'offeringAt',
		locale: 'objects.ccenter.queues.logs.offeringAt',
		field: 'offering_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'duration',
		locale: 'objects.ccenter.queues.logs.duration',
		field: 'joined_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'viewNumber',
		locale: 'objects.ccenter.queues.logs.viewNumber',
		field: 'destination',
		sort: SortSymbols.NONE,
	},
	{
		value: 'attempts',
		locale: 'objects.ccenter.queues.logs.attempts',
		field: 'attempts',
		sort: SortSymbols.NONE,
	},
	{
		value: 'result',
		locale: 'objects.ccenter.queues.logs.result',
		field: 'result',
		sort: SortSymbols.NONE,
	},
];
