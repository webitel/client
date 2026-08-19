// values must match the backend validation for the `default_members_filter` setting
export const DefaultMembersFilterOptions = {
	Today: 'this day',
	ThisWeek: 'this week',
	ThisMonth: 'this month',
} as const;

export type DefaultMembersFilterOptions =
	(typeof DefaultMembersFilterOptions)[keyof typeof DefaultMembersFilterOptions];
