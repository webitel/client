import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdAt',
		locale: 'objects.lookups.media.createdAt',
		field: 'created_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'format',
		locale: 'objects.lookups.media.format',
		field: 'mime_type',
		sort: SortSymbols.NONE,
	},
	{
		value: 'size',
		locale: 'objects.lookups.media.size',
		field: 'size',
		sort: SortSymbols.NONE,
	},
];
