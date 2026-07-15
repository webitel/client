export const DefaultMembersFilterOptions = {
	ThisDay: 'this day',
	ThisWeek: 'this week',
	ThisMonth: 'this month',
} as const;

export type DefaultMembersFilterOptions =
	(typeof DefaultMembersFilterOptions)[keyof typeof DefaultMembersFilterOptions];
