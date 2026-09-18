import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const filterConfigs = {
	[FilterOption.QueueType]: createFilterConfig({
		name: FilterOption.QueueType,
		showFilterName: true,
	}),
	[FilterOption.Team]: createFilterConfig({
		name: FilterOption.Team,
		showFilterName: true,
	}),
	[FilterOption.QueueTags]: createFilterConfig({
		name: FilterOption.QueueTags,
		showFilterName: true,
	}),
} satisfies Record<string, FilterConfigDefinition>;

export const filtersOptions: FilterConfigDefinition[] =
	Object.values(filterConfigs);
