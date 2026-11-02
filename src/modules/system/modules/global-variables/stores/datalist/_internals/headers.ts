import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers = [
	{
		value: 'name',
		locale: 'objects.key',
		show: true,
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'value',
		locale: [
			'vocabulary.values',
			1,
		],
		show: true,
		field: 'value',
		sort: SortSymbols.NONE,
	},
	{
		value: 'encrypt',
		locale: 'objects.system.globalVariables.encrypted',
		show: true,
		field: 'encrypt',
		sort: SortSymbols.NONE,
	},
];
