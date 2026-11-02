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
		value: 'source',
		locale: 'objects.integrations.importCsv.source',
		show: true,
		field: 'source',
		sort: SortSymbols.NONE,
	},
];
