import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'obac',
		locale: 'objects.permissions.object.ObAC',
		field: 'obac',
		sort: SortSymbols.NONE,
	},
	{
		value: 'rbac',
		locale: 'objects.permissions.object.RbAC',
		field: 'rbac',
		sort: SortSymbols.NONE,
	},
];
