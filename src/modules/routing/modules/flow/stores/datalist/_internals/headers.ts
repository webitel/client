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
		value: 'editor',
		locale: 'objects.routing.flow.editor',
		field: 'editor',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'type',
		locale: 'vocabulary.type',
		field: 'type',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'tags',
		locale: [
			'vocabulary.tag',
			2,
		],
		field: 'tags',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'createdAt',
		locale: 'objects.createdAt',
		field: 'created_at',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'updatedAt',
		locale: 'objects.updatedAt',
		field: 'updated_at',
		show: true,
		sort: SortSymbols.NONE,
	},
];
