import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdAt',
		locale: 'objects.createdAt',
		field: 'created_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'offeringAt',
		locale: 'objects.ccenter.queues.offeringAt',
		field: 'min_offering_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'destination',
		locale: [
			'objects.ccenter.queues.destination',
			2,
		],
		field: 'communications',
		sort: SortSymbols.NONE,
	},
	{
		value: 'priority',
		locale: 'objects.ccenter.queues.priority',
		field: 'priority',
		sort: SortSymbols.NONE,
	},
	{
		value: 'endCause',
		locale: 'objects.ccenter.queues.endCause',
		field: 'stop_cause',
		sort: SortSymbols.NONE,
	},
	{
		value: 'attempts',
		locale: 'objects.ccenter.members.attempts',
		field: 'attempts',
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
];
