import {
	createDateRangeFilterConfig,
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';

export const filterConfigs = {
	[FilterOption.Date]: createDateRangeFilterConfig({
		name: FilterOption.Date,
		notDeletable: true,
		showFilterName: true,
	}),
	[FilterOption.Action]: createFilterConfig({
		name: FilterOption.Action,
		showFilterName: true,
	}),
	[FilterOption.Object]: createFilterConfig({
		name: FilterOption.Object,
		showFilterName: true,
	}),
} satisfies Record<string, FilterConfigDefinition>;

export const filtersOptions: FilterConfigDefinition[] =
	Object.values(filterConfigs);

export const defaultDateFilter = () => ({
	name: FilterOption.Date,
	value: RelativeDatetimeValue.Today,
});
