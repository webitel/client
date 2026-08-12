import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

import FromToField from '../../../../../../../app/components/filters/from-to-filter-value-field.vue';
import FromToPreview from '../../../../../../../app/components/filters/from-to-filter-value-preview.vue';
import BucketField from '../components/filters/bucket-filter-value-field.vue';
import BucketPreview from '../components/filters/bucket-filter-value-preview.vue';
import StopCauseField from '../components/filters/stop-cause-filter-value-field.vue';
import StopCausePreview from '../components/filters/stop-cause-filter-value-preview.vue';

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
	createFilterConfig({
		name: 'stopCause',
		valueInputComponent: StopCauseField,
		valuePreviewComponent: StopCausePreview,
	}),
	createFilterConfig({
		name: 'bucket',
		valueInputComponent: BucketField,
		valuePreviewComponent: BucketPreview,
	}),
	FilterOption.Agent,
	createFilterConfig({
		name: 'memberPriority',
		valueInputComponent: FromToField,
		valuePreviewComponent: FromToPreview,
	}),
];
