export const ActionOptions = {
	All: 'all',
	Filtered: 'filtered',
	Selected: 'selected',
} as const;

export type ActionOptions = (typeof ActionOptions)[keyof typeof ActionOptions];
