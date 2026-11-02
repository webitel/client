import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers = [
	{
		value: 'object',
		locale: 'objects.system.changelogs.objects',
		show: true,
		field: 'object',
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
