import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'agent',
		sort: SortSymbols.NONE,
	},
	{
		value: 'team',
		locale: 'objects.team',
		field: 'team',
		sort: SortSymbols.NONE,
	},
	{
		value: 'capacity',
		locale: 'objects.lookups.skills.capacity',
		field: 'capacity',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'objects.lookups.skills.state',
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
];
