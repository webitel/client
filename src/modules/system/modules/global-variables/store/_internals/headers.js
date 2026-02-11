import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.key',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'value',
		locale: [
			'vocabulary.values',
			1,
		],
		field: 'value',
		sort: SortSymbols.NONE,
	},
	{
		value: 'encrypt',
		locale: 'objects.system.globalVariables.encrypted',
		field: 'encrypt',
		sort: SortSymbols.NONE,
	},
];
