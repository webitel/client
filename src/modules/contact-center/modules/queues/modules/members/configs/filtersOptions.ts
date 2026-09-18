import {
	createDateRangeFilterConfig,
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const filterConfigs = {
	[FilterOption.CreatedAt]: createDateRangeFilterConfig({
		name: FilterOption.CreatedAt,
		showFilterName: true,
		notDeletable: true,
	}),
	[FilterOption.StopCause]: createFilterConfig({
		name: FilterOption.StopCause,
		showFilterName: true,
	}),
	[FilterOption.Bucket]: createFilterConfig({
		name: FilterOption.Bucket,
		showFilterName: true,
	}),
	[FilterOption.Agent]: createFilterConfig({
		name: FilterOption.Agent,
		showFilterName: true,
	}),
	[FilterOption.MemberPriority]: createFilterConfig({
		name: FilterOption.MemberPriority,
		showFilterName: true,
	}),
} satisfies Record<string, FilterConfigDefinition>;

export const filtersOptions: FilterConfigDefinition[] =
	Object.values(filterConfigs);
