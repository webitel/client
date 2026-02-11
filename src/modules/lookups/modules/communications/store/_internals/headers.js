import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'channel',
		locale: 'vocabulary.channel',
		field: 'channel',
		sort: SortSymbols.NONE,
	},
	{
		value: 'code',
		locale: 'objects.lookups.communications.code',
		field: 'code',
		sort: SortSymbols.NONE,
	},
	{
		value: 'default',
		locale: 'objects.default',
		field: 'default',
		sort: SortSymbols.NONE,
	},
	{
		value: 'description',
		locale: 'objects.description',
		field: 'description',
		sort: SortSymbols.NONE,
	},
];
