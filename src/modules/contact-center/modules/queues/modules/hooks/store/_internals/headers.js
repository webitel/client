import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'event',
		locale: 'objects.ccenter.queues.hooks.event',
		field: 'event',
		sort: SortSymbols.NONE,
	},
	{
		value: 'schema',
		locale: [
			'objects.routing.flow.flow',
			1,
		],
		field: 'schema',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
];
