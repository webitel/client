import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'provider',
		locale: 'objects.provider',
		field: 'provider',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'service',
		locale: 'objects.service',
		field: 'service',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		field: 'enabled',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'default',
		locale: 'objects.default',
		field: 'default',
		show: true,
		sort: SortSymbols.NONE,
	},
];
