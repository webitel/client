import {
	createFilterConfig,
	createFlowTagsFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const filtersOptions: FilterConfigDefinition[] = [
	createFlowTagsFilterConfig({
		showFilterName: true,
	}),
	createFilterConfig({
		name: FilterOption.FlowType,
		showFilterName: true,
	}),
];
