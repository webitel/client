import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'numbers',
		locale: 'objects.lookups.blacklist.numbersCount',
		field: 'count',
		sort: SortSymbols.NONE,
	},
];
