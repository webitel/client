export const HookQueueEvent = {
	JOINED: 'joined',
	ANSWERED: 'answered',
	OFFERING: 'offering',
	BRIDGED: 'bridged',
	MISSED: 'missed',
	LEAVING: 'leaving',
	PROCESSING: 'processing',
	ACTIVE: 'active',
} as const;

export type HookQueueEvent =
	(typeof HookQueueEvent)[keyof typeof HookQueueEvent];
