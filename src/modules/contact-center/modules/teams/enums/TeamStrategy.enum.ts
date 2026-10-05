export const TeamStrategy = {
	Random: 'random',
	FewestCalls: 'fewest-calls',
	LeastTalkTime: 'least-talk-time',
	TopDown: 'top-down',
	RoundRobin: 'round-robin',
	RoundRobinBucket: 'round-robin-bucket',
	LongestIdleAgent: 'longest-idle-agent',
	SkillCapacity: 'skill-capacity',
} as const;

export type TeamStrategy = (typeof TeamStrategy)[keyof typeof TeamStrategy];
