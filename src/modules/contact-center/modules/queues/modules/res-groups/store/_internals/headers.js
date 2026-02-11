import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'resource_group',
		sort: SortSymbols.NONE,
	},
	{
		value: 'communication',
		locale: 'objects.ccenter.queues.communications',
		field: 'communication',
		sort: SortSymbols.NONE,
	},
];
