import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'text',
		locale: 'vocabulary.text',
		field: 'text',
		sort: SortSymbols.NONE,
	},
	{
		value: 'teams',
		locale: 'objects.team',
		field: 'teams',
		sort: SortSymbols.NONE,
	},
	{
		value: 'queues',
		locale: 'objects.ccenter.queues.queues',
		field: 'queues',
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdAt',
		locale: 'reusable.createdAt',
		field: 'created_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdBy',
		locale: 'reusable.createdBy',
		field: 'created_by',
		sort: SortSymbols.NONE,
	},
	{
		value: 'updatedAt',
		locale: 'reusable.modifiedAt',
		field: 'updated_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'updatedBy',
		locale: 'reusable.modifiedBy',
		field: 'updated_by',
		sort: SortSymbols.NONE,
	},
];
