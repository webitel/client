import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'proxy',
		locale: 'objects.routing.gateways.proxy',
		field: 'proxy',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		width: '120px',
		field: 'enable',
		sort: SortSymbols.NONE,
	},
	{
		value: 'status',
		locale: 'objects.status',
		field: 'r_state',
		sort: SortSymbols.NONE,
	},
];
