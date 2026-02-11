import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'usage',
		locale: 'objects.directory.users.usage',
		field: 'usage',
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdAt',
		locale: 'objects.createdAt',
		field: 'created_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdBy',
		locale: 'objects.createdBy',
		field: 'created_by',
		sort: SortSymbols.NONE,
	},
];
