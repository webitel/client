import { FilterOption } from '@webitel/ui-datalist/filters';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';

/**
 * @description
 * The log has always opened on today rather than on everything, so the date
 * range is seeded on entry and re-seeded by "clear filters".
 *
 * Relative, not an absolute `{ from, to }`: `normalizeDatetimeRange` expands it
 * per request, so a shared url keeps meaning "today" instead of freezing on the
 * day it was copied. It also lets the static panel preselect the Today preset
 * rather than opening on a custom range.
 */
export const defaultJoinedAtFilter = () => ({
	name: FilterOption.JoinedAt,
	value: RelativeDatetimeValue.Today,
});
