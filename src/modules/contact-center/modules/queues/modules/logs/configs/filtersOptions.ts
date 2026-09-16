import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const joinedAtFilterConfig = createFilterConfig({
	name: FilterOption.JoinedAt,
	// the log is always bounded by a date range; there is no "all time" view
	notDeletable: true,
});

export const filtersOptions: FilterConfigDefinition[] = [
	joinedAtFilterConfig,
	FilterOption.Agent,
	FilterOption.Bucket,
	FilterOption.LeavingAt,
	FilterOption.OfferingAt,
	FilterOption.CallReportingResult,
	FilterOption.AttemptDuration,
];
