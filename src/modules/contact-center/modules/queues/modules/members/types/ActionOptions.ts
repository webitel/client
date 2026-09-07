export const ActionOptions = {
	ALL: 'all',
	FILTERED: 'filtered',
	SELECTED: 'selected',
} as const;

export type ActionOptions = (typeof ActionOptions)[keyof typeof ActionOptions];
