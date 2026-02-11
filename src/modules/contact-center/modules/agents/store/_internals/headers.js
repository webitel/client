import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'objects.ccenter.agents.state',
		field: 'status',
		sort: SortSymbols.NONE,
	},
	{
		value: 'time',
		locale: 'objects.ccenter.agents.stateTime',
		field: 'status_duration',
		sort: SortSymbols.NONE,
	},
	{
		value: 'team',
		locale: 'objects.team',
		field: 'team',
		sort: SortSymbols.NONE,
	},
];
