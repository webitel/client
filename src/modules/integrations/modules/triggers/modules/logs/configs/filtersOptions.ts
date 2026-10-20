import {
	createDateRangeFilterConfig,
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';

export const filterConfigs = {
	[FilterOption.StartedAt]: createDateRangeFilterConfig({
		name: FilterOption.StartedAt,
		notDeletable: true,
		showFilterName: true,
	}),
	[FilterOption.TriggerJobState]: createFilterConfig({
		name: FilterOption.TriggerJobState,
		showFilterName: true,
	}),
	[FilterOption.AttemptDuration]: createFilterConfig({
		name: FilterOption.AttemptDuration,
		showFilterName: true,
	}),
} satisfies Record<string, FilterConfigDefinition>;

export const filtersOptions: FilterConfigDefinition[] =
	Object.values(filterConfigs);

/** [Claude] the logs open on today's runs, as they did with the old filters */
export const defaultStartedAtFilter = () => ({
	name: FilterOption.StartedAt,
	value: RelativeDatetimeValue.Today,
});
