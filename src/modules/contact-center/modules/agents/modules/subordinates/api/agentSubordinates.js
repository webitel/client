import { AgentsAPI } from '@webitel/api-services/api';

/**
 * Subordinates are just agents whose `supervisor` list contains the parent, so
 * every write here is a patch of the subordinate's own supervisor list.
 */
export const getAgentSubordinatesList = ({ parentId, ...params }) =>
	AgentsAPI.getList({
		...params,
		fields: [
			'id',
			'name',
			'supervisor',
			'skills',
		],
		supervisorId: parentId,
	});

export const getAgentSubordinate = async ({ itemId }) => ({
	agent: await AgentsAPI.get({
		itemId,
	}),
});

export const addAgentSubordinate = ({ parentId, itemInstance }) => {
	const { id, supervisor } = itemInstance.agent;
	// Set and .map() from obj to string and backwards is used to prevent duplicates
	const newSupervisor = [
		...new Set(supervisor.map((sup) => sup.id).concat(parentId)),
	].map((id) => ({
		id,
	}));
	return AgentsAPI.patch({
		id,
		changes: {
			supervisor: newSupervisor,
		},
	});
};

export const deleteAgentSubordinate = ({ id, parentId, dataList }) => {
	/* deleted subordinate is in dataList,
   so first we should find it and retrieve his supervisors list */
	const subordinate = dataList.find((sup) => sup.id === id);
	const newSupervisor = subordinate.supervisor.filter(
		({ id }) => id !== parentId,
	);
	return AgentsAPI.patch({
		id,
		changes: {
			supervisor: newSupervisor,
		},
	});
};

export const updateAgentSubordinate = async ({
	parentId,
	itemId,
	itemInstance,
	dataList,
}) => {
	await addAgentSubordinate({
		parentId,
		itemInstance,
	});
	await deleteAgentSubordinate({
		id: itemId,
		parentId,
		dataList,
	});
};

const AgentSubordinatesAPI = {
	getList: getAgentSubordinatesList,
	get: getAgentSubordinate,
	add: addAgentSubordinate,
	update: updateAgentSubordinate,
	delete: deleteAgentSubordinate,
};

export default AgentSubordinatesAPI;
