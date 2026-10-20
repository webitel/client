import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers = [
	{
		value: 'action',
		locale: [
			'objects.system.changelogs.logs.actions',
			1,
		],
		show: true,
		field: 'action',
		sort: SortSymbols.NONE,
	},
	{
		value: 'date',
		locale: 'reusable.modifiedAt',
		show: true,
		field: 'date',
		sort: SortSymbols.NONE,
	},
	{
		value: 'user',
		locale: 'reusable.modifiedBy',
		show: true,
		field: 'user',
		sort: SortSymbols.NONE,
	},
	{
		value: 'userIp',
		locale: 'objects.directory.users.userIp',
		show: true,
		field: 'user_ip',
		sort: SortSymbols.NONE,
	},
	{
		value: 'userId',
		locale: 'objects.directory.users.userId',
		show: true,
		field: 'user',
		sort: SortSymbols.NONE,
	},
	{
		value: 'object',
		locale: [
			'objects.system.changelogs.objects',
			1,
		],
		show: true,
		field: 'object',
		sort: SortSymbols.NONE,
	},
	{
		value: 'record',
		locale: [
			'objects.system.changelogs.logs.records',
			1,
		],
		show: true,
		field: 'record',
		sort: SortSymbols.NONE,
	},
];
