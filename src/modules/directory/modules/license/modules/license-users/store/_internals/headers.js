import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'domain',
		locale: 'objects.directory.license.domain',
		field: 'domain',
		show: true,
		sort: SortSymbols.NONE,
		width: '3fr',
	},
	{
		value: 'name',
		locale: [
			'objects.directory.users.users',
			1,
		],
		field: 'user',
		show: true,
		sort: SortSymbols.NONE,
		width: '3fr',
	},
	{
		value: 'used',
		locale: 'objects.directory.license.used',
		field: 'sessions',
		show: true,
		sort: SortSymbols.NONE,
	},
];
