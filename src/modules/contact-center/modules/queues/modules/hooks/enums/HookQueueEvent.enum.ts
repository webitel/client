export const HookQueueEvent = {
	Joined: 'joined',
	Answered: 'answered',
	Offering: 'offering',
	Bridged: 'bridged',
	Missed: 'missed',
	Leaving: 'leaving',
	Processing: 'processing',
	Active: 'active',
} as const;

export type HookQueueEvent =
	(typeof HookQueueEvent)[keyof typeof HookQueueEvent];
