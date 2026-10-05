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
		value: 'limit',
		locale: 'objects.lookups.pauseCause.limit',
		field: 'limit_min',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'teams',
		locale: 'objects.team',
		field: 'teams',
		show: true,
	},
	{
		value: 'allowAdmin',
		locale: 'objects.lookups.pauseCause.allowAdmin',
		field: 'allow_admin',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'allowSupervisor',
		locale: 'objects.lookups.pauseCause.allowSupervisor',
		field: 'allow_supervisor',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'allowAgent',
		locale: 'objects.lookups.pauseCause.allowAgent',
		field: 'allow_agent',
		show: true,
		sort: SortSymbols.NONE,
	},
];
