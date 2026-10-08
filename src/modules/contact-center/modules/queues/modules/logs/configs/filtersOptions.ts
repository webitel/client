import {
	createDateRangeFilterConfig,
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';

export const filterConfigs = {
	[FilterOption.JoinedAt]: createDateRangeFilterConfig({
		name: FilterOption.JoinedAt,
		notDeletable: true,
		showFilterName: true,
	}),
	[FilterOption.CallReportingResult]: createFilterConfig({
		name: FilterOption.CallReportingResult,
		showFilterName: true,
	}),
	[FilterOption.Agent]: createFilterConfig({
		name: FilterOption.Agent,
		showFilterName: true,
	}),
	[FilterOption.AttemptDuration]: createFilterConfig({
		name: FilterOption.AttemptDuration,
		showFilterName: true,
	}),
} satisfies Record<string, FilterConfigDefinition>;

export const filtersOptions: FilterConfigDefinition[] =
	Object.values(filterConfigs);

export const defaultJoinedAtFilter = () => ({
	name: FilterOption.JoinedAt,
	value: RelativeDatetimeValue.Today,
});
