import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'gateway',
		locale: [
			'objects.routing.gateways.gateways',
			1,
		],
		field: 'gateway',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		width: '120px',
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
];
