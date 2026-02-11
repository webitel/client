import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'action',
		locale: [
			'objects.system.changelogs.logs.actions',
			1,
		],
		field: 'action',
		sort: SortSymbols.NONE,
	},
	{
		value: 'date',
		locale: 'reusable.modifiedAt',
		field: 'date',
		sort: SortSymbols.NONE,
	},
	{
		value: 'user',
		locale: 'reusable.modifiedBy',
		field: 'user',
		sort: SortSymbols.NONE,
	},
	{
		value: 'userIp',
		locale: 'objects.directory.users.userIp',
		field: 'user_ip',
		sort: SortSymbols.NONE,
	},
	{
		value: 'userId',
		locale: 'objects.directory.users.userId',
		field: 'user',
		sort: SortSymbols.NONE,
	},
	{
		value: 'object',
		locale: [
			'objects.system.changelogs.objects',
			1,
		],
		field: 'object',
		sort: SortSymbols.NONE,
	},
	{
		value: 'record',
		locale: [
			'objects.system.changelogs.logs.records',
			1,
		],
		field: 'record',
		sort: SortSymbols.NONE,
	},
];
