import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

/*
the panel renders in static mode, so every filter is on screen at once and each
one has to be labelled with its own name rather than a generic "Values"
 */
export const filtersOptions: FilterConfigDefinition[] = [
	createFilterConfig({
		name: FilterOption.JoinedAt,
		// the log is always bounded by a date range; there is no "all time" view
		notDeletable: true,
		showFilterName: true,
	}),
	createFilterConfig({
		name: FilterOption.Agent,
		showFilterName: true,
	}),
	createFilterConfig({
		name: FilterOption.Bucket,
		showFilterName: true,
	}),
	createFilterConfig({
		name: FilterOption.LeavingAt,
		showFilterName: true,
	}),
	createFilterConfig({
		name: FilterOption.OfferingAt,
		showFilterName: true,
	}),
	createFilterConfig({
		name: FilterOption.CallReportingResult,
		showFilterName: true,
	}),
	createFilterConfig({
		name: FilterOption.AttemptDuration,
		showFilterName: true,
	}),
];
