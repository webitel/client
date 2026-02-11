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
		value: 'state',
		locale: 'objects.ccenter.agents.state',
		field: 'status',
		sort: SortSymbols.NONE,
	},
	{
		value: 'skills',
		locale: [
			'objects.lookups.skills.skills',
			1,
		],
		field: 'skills',
		sort: SortSymbols.NONE,
	},
];
