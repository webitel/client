import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.system.configuration.parameter',
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
];
