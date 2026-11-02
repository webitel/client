import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'obac',
		locale: 'objects.permissions.object.ObAC',
		field: 'obac',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'rbac',
		locale: 'objects.permissions.object.RbAC',
		field: 'rbac',
		show: true,
		sort: SortSymbols.NONE,
	},
];
