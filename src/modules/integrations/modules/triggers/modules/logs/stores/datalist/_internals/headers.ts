import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { FilterOption } from '@webitel/ui-datalist/filters';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

import { filterConfigs } from '../../../configs/filtersOptions';

export const headers: DatalistTableHeader[] = [
	{
		value: 'startedAt',
		locale: 'objects.integrations.triggers.logs.startedAt',
		show: true,
		field: 'started_at',
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.StartedAt],
	},
	{
		value: 'duration',
		locale: 'vocabulary.duration',
		show: true,
		// [Claude] the duration is counted from the start to `stopped_at`, so that is what gets requested
		field: 'stopped_at',
		filter: filterConfigs[FilterOption.AttemptDuration],
	},
	{
		value: 'state',
		locale: 'objects.integrations.triggers.logs.result',
		show: true,
		field: 'state',
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.TriggerJobState],
	},
];
