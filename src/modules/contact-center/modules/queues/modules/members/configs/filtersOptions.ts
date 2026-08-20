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

/**
 * The vuex filters store shipped `priority` with both `value` and
 * `defaultValue` set to `{ from: 0 }`, so every members request carried
 * `priority.from=0`. Seeded on the page (the filters panel only mounts while it
 * is open) and re-applied on "reset all", so the list keeps excluding negative
 * priorities as it did.
 */
export const defaultMemberPriorityFilter = () => ({
	name: FilterOption.MemberPriority,
	value: {
		from: 0,
		to: undefined,
	},
});
