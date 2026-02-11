import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'uri',
		locale: 'objects.routing.chatGateways.uri',
		field: 'uri',
		sort: SortSymbols.NONE,
	},
	{
		value: 'flow',
		locale: [
			'objects.routing.flow.flow',
			1,
		],
		field: 'flow',
		sort: SortSymbols.NONE,
	},
	{
		value: 'provider',
		locale: 'objects.provider',
		field: 'provider',
		sort: SortSymbols.NONE,
	},
	{
		value: 'enabled',
		locale: 'reusable.state',
		field: 'enabled',
		sort: SortSymbols.NONE,
	},
];
