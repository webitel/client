import type { DatalistTableHeader } from '@webitel/ui-datalist';

export const historyHeaders: DatalistTableHeader[] = [
	{
		value: 'user',
		locale: 'objects.user',
		field: 'user',
		show: true,
	},
	{
		value: 'loggedIn',
		locale: 'objects.directory.devices.loggedIn',
		field: 'loggedIn',
		show: true,
	},
	{
		value: 'loggedOut',
		locale: 'objects.directory.devices.loggedOut',
		field: 'loggedOut',
		show: true,
	},
];
