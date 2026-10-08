import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'action',
		locale: [
			'objects.system.changelogs.logs.actions',
			1,
		],
		field: 'action',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'date',
		locale: 'reusable.modifiedAt',
		field: 'date',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'userIp',
		locale: 'objects.directory.users.userIp',
		field: 'user_ip',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'object',
		locale: [
			'objects.system.changelogs.objects',
			1,
		],
		field: 'object',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'record',
		locale: [
			'objects.system.changelogs.logs.records',
			1,
		],
		field: 'record',
		show: true,
		sort: SortSymbols.NONE,
	},
];
