import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
	{
		value: 'startedAt',
		locale: 'objects.integrations.triggers.logs.startedAt',
		field: 'started_at',
		sort: SortSymbols.NONE,
	},
	{
		value: 'duration',
		locale: 'vocabulary.duration',
	},
	{
		value: 'state',
		locale: 'objects.integrations.triggers.logs.result',
		field: 'state',
		sort: SortSymbols.NONE,
	},
];
