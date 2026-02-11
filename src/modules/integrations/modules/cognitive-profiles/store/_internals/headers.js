import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'provider',
		locale: 'objects.provider',
		field: 'provider',
		sort: SortSymbols.NONE,
	},
	{
		value: 'service',
		locale: 'objects.service',
		field: 'service',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
	{
		value: 'default',
		locale: 'objects.default',
		field: 'default',
		sort: SortSymbols.NONE,
	},
];
