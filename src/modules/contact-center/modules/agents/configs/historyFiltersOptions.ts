import {
	createDateRangeFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const historyFiltersOptions: FilterConfigDefinition[] = [
	createDateRangeFilterConfig({
		name: FilterOption.JoinedAt,
		notDeletable: true,
	}),
];
