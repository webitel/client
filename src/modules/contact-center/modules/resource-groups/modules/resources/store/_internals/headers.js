import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'resource',
		sort: SortSymbols.NONE,
	},
	{
		value: 'priority',
		locale: 'objects.ccenter.res.priority',
		field: 'priority',
		sort: SortSymbols.NONE,
	},
	{
		value: 'reserveResource',
		locale: 'objects.ccenter.res.reserveResource',
		field: 'reserveResource',
		sort: SortSymbols.NONE,
	},
];
