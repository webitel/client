import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'supervisor',
		locale: [
			'objects.ccenter.agents.supervisors',
			1,
		],
		field: 'supervisor',
		sort: SortSymbols.NONE,
	},
	{
		value: 'skills',
		locale: [
			'objects.lookups.skills.skills',
			2,
		],
		field: 'skills',
		sort: SortSymbols.NONE,
	},
];
