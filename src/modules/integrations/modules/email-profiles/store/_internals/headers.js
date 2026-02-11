import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'mailbox',
		locale: 'objects.integrations.emailProfiles.mailbox',
		field: 'mailbox',
		sort: SortSymbols.NONE,
	},
	{
		value: 'flow',
		locale: [
			'objects.routing.flow.flow',
			1,
		],
		field: 'schema',
		sort: SortSymbols.NONE,
	},
	{
		value: 'listen',
		locale: 'objects.integrations.emailProfiles.listen',
		field: 'listen',
		sort: SortSymbols.NONE,
	},
	{
		value: 'state',
		locale: 'reusable.state',
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
];
