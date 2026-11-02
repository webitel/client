import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'text',
		locale: 'vocabulary.text',
		field: 'text',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'teams',
		locale: 'objects.team',
		field: 'teams',
		show: true,
	},
	{
		value: 'queues',
		locale: 'objects.ccenter.queues.queues',
		field: 'queues',
		show: true,
	},
	{
		value: 'createdAt',
		locale: 'reusable.createdAt',
		field: 'created_at',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdBy',
		locale: 'reusable.createdBy',
		field: 'created_by',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'updatedAt',
		locale: 'reusable.modifiedAt',
		field: 'updated_at',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'updatedBy',
		locale: 'reusable.modifiedBy',
		field: 'updated_by',
		show: true,
		sort: SortSymbols.NONE,
	},
];
