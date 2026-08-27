import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const filtersOptions: FilterConfigDefinition[] = [
	createFilterConfig({
		name: FilterOption.JoinedAt,
		// the log is always bounded by a date range; there is no "all time" view
		notDeletable: true,
	}),
	FilterOption.Agent,
	FilterOption.Bucket,
	FilterOption.LeavingAt,
	FilterOption.OfferingAt,
	FilterOption.CallReportingResult,
	FilterOption.AttemptDuration,
];
