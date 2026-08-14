import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

import BucketField from '../components/filters/bucket-filter-value-field.vue';
import BucketPreview from '../components/filters/bucket-filter-value-preview.vue';

/**
 * @description
 * The members filters panel.
 *
 * Two filters are renamed from what the vuex store called them, because the
 * shared set already uses those names for something else: `cause` is
 * `FilterOption.HangupCause` and `priority` is `FilterOption.CasePriority`.
 * `QueueMembersAPI` accepts both spellings, so the reset and count endpoints
 * keep working off the same values.
 *
 * `createdAt` replaces the old flat `from`/`to` pair with one range value.
 */
export const filtersOptions: FilterConfigDefinition[] = [
	FilterOption.CreatedAt,
	FilterOption.StopCause,
	createFilterConfig({
		name: 'bucket',
		valueInputComponent: BucketField,
		valuePreviewComponent: BucketPreview,
	}),
	FilterOption.Agent,
	FilterOption.MemberPriority,
];
