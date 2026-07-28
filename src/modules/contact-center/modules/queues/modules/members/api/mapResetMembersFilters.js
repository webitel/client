const mapResetMembersFilters = (filters) => ({
	agent_id: filters.agent,
	bucket_id: filters.bucket,
	created_at: {
		from: filters.from,
		to: filters.to,
	},
	priority: {
		from: filters.priority?.from,
		to: filters.priority?.to,
	},
	q: filters.search,
	stop_cause: filters.cause,
});

const mapResetMembersQuantityFilters = (filters) => {
	const { created_at, priority, ...rest } = mapResetMembersFilters(filters);

	return {
		...rest,
		'created_at.from': created_at.from,
		'created_at.to': created_at.to,
		'priority.from': priority.from,
		'priority.to': priority.to,
	};
};

export { mapResetMembersFilters, mapResetMembersQuantityFilters };
