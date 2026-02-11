import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'limit',
		locale: 'objects.lookups.pauseCause.limit',
		field: 'limit_min',
		sort: SortSymbols.NONE,
	},
	{
		value: 'allowAdmin',
		locale: 'objects.lookups.pauseCause.allowAdmin',
		field: 'allow_admin',
		sort: SortSymbols.NONE,
	},
	{
		value: 'allowSupervisor',
		locale: 'objects.lookups.pauseCause.allowSupervisor',
		field: 'allow_supervisor',
		sort: SortSymbols.NONE,
	},
	{
		value: 'allowAgent',
		locale: 'objects.lookups.pauseCause.allowAgent',
		field: 'allow_agent',
		sort: SortSymbols.NONE,
	},
];
