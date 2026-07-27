const mapResetMembersFilters = (filters) => ({
	agent_id: filters.agent?.value?.map((agent) => agent.id),
	bucket_id: filters.bucket?.value?.map((bucket) => bucket.id),
	created_at: {
		from: filters.from?.value,
		to: filters.to?.value,
	},
	priority: {
		from: filters.priority?.value?.from,
		to: filters.priority?.value?.to,
	},
	q: filters.search?.value,
	stop_cause: filters.cause?.value?.map((cause) => cause.value),
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
