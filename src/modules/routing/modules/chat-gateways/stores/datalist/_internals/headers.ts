import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'name',
		locale: 'objects.name',
		field: 'name',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'uri',
		locale: 'objects.routing.chatGateways.uri',
		field: 'uri',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'flow',
		locale: [
			'objects.routing.flow.flow',
			1,
		],
		field: 'flow',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'provider',
		locale: 'objects.provider',
		field: 'provider',
		show: true,
		sort: SortSymbols.NONE,
	},
	{
		value: 'enabled',
		locale: 'reusable.state',
		field: 'enabled',
		show: true,
		sort: SortSymbols.NONE,
	},
];
