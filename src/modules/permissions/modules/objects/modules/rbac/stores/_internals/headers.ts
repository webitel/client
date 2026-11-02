import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

/** [Claude] the three rule columns all come from one `granted` string */
export const headers: DatalistTableHeader[] = [
	{
		value: 'grantor',
		locale: 'objects.permissions.object.grantor',
		field: 'grantor',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'grantee',
		locale: 'objects.permissions.object.grantee',
		field: 'grantee',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'read',
		locale: 'objects.read',
		field: 'granted',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'edit',
		locale: 'objects.edit',
		field: 'granted',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'delete',
		locale: 'objects.permissions.object.delete',
		field: 'granted',
		show: true,
		sort: SortSymbols.NONE,
	},
];
