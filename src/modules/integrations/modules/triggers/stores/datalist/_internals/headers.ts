import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers = [
	{
		value: 'name',
		locale: 'objects.name',
		show: true,
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'type',
		locale: 'objects.integrations.triggers.type',
		show: true,
		field: 'type',
		sort: SortSymbols.NONE,
	},
	{
		value: 'schema',
		locale: 'objects.integrations.triggers.schema',
		show: true,
		field: 'schema',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		show: true,
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
];
