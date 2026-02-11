const TeamStrategy = Object.freeze({
	RANDOM: 'random',
	FEWEST_CALLS: 'fewest-calls',
	LEAST_TALK_TIME: 'least-talk-time',
	TOP_DOWN: 'top-down',
	ROUND_ROBIN: 'round-robin',
	ROUND_ROBIN_BUCKET: 'round-robin-bucket',
	LONGEST_IDLE_AGENT: 'longest-idle-agent',
	SKILL_CAPACITY: 'skill-capacity',
});

export default TeamStrategy;
