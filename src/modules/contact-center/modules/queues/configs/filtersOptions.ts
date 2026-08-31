import {
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

/**
 * Queues filters panel. Names are request params: `QueuesAPI.getList`
 * reads `queueType`, `team`, `tags`. Not `FilterOption.Tag` (`tag`).
 */
export const filtersOptions: FilterConfigDefinition[] = [
	FilterOption.QueueType,
	FilterOption.Team,
	FilterOption.QueueTags,
];
