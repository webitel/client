import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		width: '250px',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'limit',
		locale: 'objects.lookups.pauseCause.limit',
		width: '140px',
		field: 'limit_min',
		sort: SortSymbols.NONE,
	},
	{
		value: 'teams',
		locale: 'objects.team',
		width: '230px',
		field: 'teams',
		sort: SortSymbols.NONE,
	},
	{
		value: 'allowAdmin',
		locale: 'objects.lookups.pauseCause.allowAdmin',
		width: '200px',
		field: 'allow_admin',
		sort: SortSymbols.NONE,
	},
	{
		value: 'allowSupervisor',
		locale: 'objects.lookups.pauseCause.allowSupervisor',
		width: '235px',
		field: 'allow_supervisor',
		sort: SortSymbols.NONE,
	},
	{
		value: 'allowAgent',
		locale: 'objects.lookups.pauseCause.allowAgent',
		width: '195px',
		field: 'allow_agent',
		sort: SortSymbols.NONE,
	},
];
