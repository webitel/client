import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'type',
		locale: 'objects.integrations.triggers.type',
		field: 'type',
		sort: SortSymbols.NONE,
	},
	{
		value: 'schema',
		locale: 'objects.integrations.triggers.schema',
		field: 'schema',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
];
