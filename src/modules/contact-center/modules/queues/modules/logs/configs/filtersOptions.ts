import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

import FromToField from '../../../../../../../app/components/filters/from-to-filter-value-field.vue';
import FromToPreview from '../../../../../../../app/components/filters/from-to-filter-value-preview.vue';
import JoinedAtField from '../components/filters/joined-at-filter-value-field.vue';
import JoinedAtPreview from '../components/filters/joined-at-filter-value-preview.vue';
import ResultField from '../components/filters/result-filter-value-field.vue';
import ResultPreview from '../components/filters/result-filter-value-preview.vue';

/**
 * @description
 * The queue log's filters panel.
 *
 * Each name is the request param key — `QueueLogsAPI.getList` reads `joinedAt`,
 * `agent`, `bucket`, `result`, `duration`, `leavingAt` and `offeringAt`, and
 * splits the ranges into the positional bounds the service takes.
 *
 * `joinedAt` and `duration` were two flat filters each before; the panel holds a
 * range as one `{ from, to }` value, which is also what fixes `duration` — the
 * api used to look for `durationFrom`/`durationTo`, which the store never set.
 */
export const filtersOptions: FilterConfigDefinition[] = [
	createFilterConfig({
		name: 'joinedAt',
		valueInputComponent: JoinedAtField,
		valuePreviewComponent: JoinedAtPreview,
		// the log is always bounded by a date range; there is no "all time" view
		notDeletable: true,
	}),
	FilterOption.Agent,
	FilterOption.Bucket,
	FilterOption.LeavingAt,
	FilterOption.OfferingAt,
	createFilterConfig({
		name: 'result',
		valueInputComponent: ResultField,
		valuePreviewComponent: ResultPreview,
	}),
	createFilterConfig({
		name: 'duration',
		valueInputComponent: FromToField,
		valuePreviewComponent: FromToPreview,
	}),
];
