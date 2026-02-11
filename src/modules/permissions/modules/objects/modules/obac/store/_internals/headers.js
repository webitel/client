import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'grantee',
		locale: 'objects.permissions.object.grantee',
		field: 'grantee',
		sort: SortSymbols.NONE,
	},
	{
		value: 'create',
		locale: 'objects.permissions.object.create',
		field: 'x',
		sort: SortSymbols.NONE,
	},
	{
		value: 'read',
		locale: 'objects.read',
		field: 'r',
		sort: SortSymbols.NONE,
	},
	{
		value: 'edit',
		locale: 'objects.edit',
		field: 'w',
		sort: SortSymbols.NONE,
	},
	{
		value: 'delete',
		locale: 'objects.permissions.object.delete',
		field: 'd',
		sort: SortSymbols.NONE,
	},
];
