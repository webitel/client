import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers = [
	{
		value: 'name',
		locale: 'objects.name',
		show: true,
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'description',
		locale: 'objects.description',
		show: true,
		field: 'description',
		sort: SortSymbols.NONE,
	},
];
