import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'skill',
		sort: SortSymbols.NONE,
	},
	{
		value: 'capacity',
		locale: 'objects.lookups.skills.capacity',
		field: 'max_capacity',
		sort: SortSymbols.NONE,
	},
	{
		value: 'lvl',
		locale: 'objects.lookups.skills.lvl',
		field: 'lvl',
		sort: SortSymbols.NONE,
	},
	{
		value: 'buckets',
		locale: [
			'objects.lookups.buckets.buckets',
			1,
		],
		field: 'buckets',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'objects.lookups.skills.state',
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
];
