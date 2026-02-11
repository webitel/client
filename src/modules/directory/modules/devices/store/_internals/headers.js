import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'account',
		locale: 'objects.directory.devices.authId',
		field: 'account',
		sort: SortSymbols.NONE,
	},
	{
		value: 'user',
		locale: 'objects.user',
		field: 'user',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'objects.directory.devices.presence',
		field: 'reged',
		sort: SortSymbols.NONE,
	},
];
