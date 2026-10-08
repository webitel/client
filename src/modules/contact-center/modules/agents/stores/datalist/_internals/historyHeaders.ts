import type { DatalistTableHeader } from '@webitel/ui-datalist';

export const historyHeaders: DatalistTableHeader[] = [
	{
		value: 'state',
		locale: 'objects.ccenter.agents.historyState',
		field: 'state',
		show: true,
	},
	{
		value: 'channel',
		locale: 'objects.ccenter.agents.historyChannel',
		field: 'channel',
		show: true,
	},
	{
		value: 'from',
		locale: 'objects.ccenter.agents.historyFrom',
		field: 'joined_at',
		show: true,
	},
	{
		value: 'to',
		locale: 'objects.ccenter.agents.historyTo',
		field: 'to',
		show: true,
	},
	{
		value: 'duration',
		locale: 'objects.ccenter.agents.historyDuration',
		field: 'duration',
		show: true,
	},
];
