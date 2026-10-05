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
		value: 'description',
		locale: 'objects.description',
		field: 'description',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'skills',
		locale: 'objects.lookups.skills.skills',
		field: 'skills',
		show: true,
		sort: SortSymbols.NONE,
	},
];
