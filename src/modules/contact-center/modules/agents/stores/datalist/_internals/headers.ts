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
		value: 'state',
		locale: 'objects.ccenter.agents.state',
		field: 'status',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'time',
		locale: 'objects.ccenter.agents.stateTime',
		field: 'status_duration',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'team',
		locale: 'objects.team',
		field: 'team',
		show: true,
		sort: SortSymbols.NONE,
	},
];
