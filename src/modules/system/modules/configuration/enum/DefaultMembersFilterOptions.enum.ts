import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';

// values must match the backend validation for the `default_members_filter` setting
export const DefaultMembersFilterOptions = {
	Today: 'this day',
	ThisWeek: 'this week',
	ThisMonth: 'this month',
} as const;

export type DefaultMembersFilterOptions =
	(typeof DefaultMembersFilterOptions)[keyof typeof DefaultMembersFilterOptions];

// reuse RelativeDatetimeValue's translations for the matching DefaultMembersFilterOptions value
export const defaultMembersFilterToRelativeDatetime: Record<
	DefaultMembersFilterOptions,
	RelativeDatetimeValue
> = {
	[DefaultMembersFilterOptions.Today]: RelativeDatetimeValue.Today,
	[DefaultMembersFilterOptions.ThisWeek]: RelativeDatetimeValue.ThisWeek,
	[DefaultMembersFilterOptions.ThisMonth]: RelativeDatetimeValue.ThisMonth,
};
