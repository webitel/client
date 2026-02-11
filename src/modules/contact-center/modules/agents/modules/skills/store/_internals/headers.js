import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: [
			'objects.lookups.skills.skills',
			2,
		],
		field: 'skill',
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
