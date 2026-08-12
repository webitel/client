import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

import QueueTagsFilterValueField from '../components/filters/queue-tags-filter-value-field.vue';
import QueueTagsFilterValuePreview from '../components/filters/queue-tags-filter-value-preview.vue';

/**
 * @description
 * The queues filters panel.
 *
 * Each name is also the request param key: `createTableStore` spreads
 * `filtersManager.getAllValues()` straight into `QueuesAPI.getList`, which
 * destructures `search`, `queueType`, `team` and `tags`.
 *
 * `search` is deliberately absent — it belongs to the action bar's
 * `dynamic-filter-search`, not the panel.
 *
 * `queueType` and `team` come from the shared filter set; the queue-type
 * filter's own composable already applies the same `VITE_STAGING_ENV` gate that
 * the app's `QueueTypeOptions` did, so that list is no longer needed here.
 */
export const filtersOptions: FilterConfigDefinition[] = [
	FilterOption.QueueType,
	FilterOption.Team,
	createFilterConfig({
		// not FilterOption.Tag: that is the call-history tag enum, and its name
		// (`tag`) is not the param searchQueue expects
		name: 'tags',
		valueInputComponent: QueueTagsFilterValueField,
		valuePreviewComponent: QueueTagsFilterValuePreview,
	}),
];
