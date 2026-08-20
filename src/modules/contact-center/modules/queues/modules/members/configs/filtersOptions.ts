import {
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

/**
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
	FilterOption.OfferingAt,
	FilterOption.StopCause,
	FilterOption.Bucket,
	FilterOption.Agent,
	FilterOption.MemberPriority,
	FilterOption.MemberAttempts,
	FilterOption.MemberName,
	FilterOption.MemberDestination,
];
