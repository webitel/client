import {
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

/**
 * Everything the queues list can be filtered by. Filters live in the column
 * headers (`headers.ts` points each one at its column); this list is what the
 * filters icon's menu resets and what presets are built from.
 *
 * Names are request params: `QueuesAPI.getList`
 * reads `queueType`, `team`, `tags`. Not `FilterOption.Tag` (`tag`).
 */
export const filtersOptions: FilterConfigDefinition[] = [
	FilterOption.QueueType,
	FilterOption.Team,
	FilterOption.QueueTags,
];
