import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'mailbox',
		locale: 'objects.integrations.emailProfiles.mailbox',
		field: 'mailbox',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'flow',
		locale: [
			'objects.routing.flow.flow',
			1,
		],
		field: 'schema',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'listen',
		locale: 'objects.integrations.emailProfiles.listen',
		field: 'listen',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		field: 'enabled',
		show: true,
		sort: SortSymbols.NONE,
	},
];
