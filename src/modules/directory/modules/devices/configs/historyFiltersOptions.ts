import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

/** Device audit history is always bounded by a date range. */
export const historyFiltersOptions: FilterConfigDefinition[] = [
	createFilterConfig({
		name: FilterOption.CreatedAt,
		notDeletable: true,
	}),
];
