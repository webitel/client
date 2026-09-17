import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

/**
 * Every queue log filter, keyed by its name, so `headers.ts` can point a column
 * straight at the filter it opens instead of the configs being exported one by
 * one. Insertion order is the order the filters icon's menu shows them in.
 */
export const filterConfigs = {
	[FilterOption.JoinedAt]: createFilterConfig({
		name: FilterOption.JoinedAt,
		// the log is always bounded by a date range; there is no "all time" view
		notDeletable: true,
	}),
	[FilterOption.Agent]: FilterOption.Agent,
	[FilterOption.Bucket]: FilterOption.Bucket,
	[FilterOption.LeavingAt]: FilterOption.LeavingAt,
	[FilterOption.OfferingAt]: FilterOption.OfferingAt,
	[FilterOption.CallReportingResult]: FilterOption.CallReportingResult,
	[FilterOption.AttemptDuration]: FilterOption.AttemptDuration,
} satisfies Record<string, FilterConfigDefinition>;

export const filtersOptions: FilterConfigDefinition[] =
	Object.values(filterConfigs);
