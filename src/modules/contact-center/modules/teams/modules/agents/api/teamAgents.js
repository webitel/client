import { AgentsAPI } from '@webitel/api-services/api';

/**
 * A team's agents are agents filtered by `team`, so add and remove are patches
 * of the agent's own team.
 */
const defaultObject = {
	name: '',
	status: '',
	supervisor: {},
	skills: [],
};

const getTeamAgentsList = async ({ parentId, ...params }) => {
	const { items, next } = await AgentsAPI.getList({
		...params,
		fields: [
			'id',
			'name',
			'status',
			'supervisor',
			'skills',
		],
		team: parentId,
	});

	return {
		items: items.map((item) => ({
			...defaultObject,
			...item,
		})),
		next,
	};
};

const getTeamAgent = async ({ itemId }) => ({
	agent: await AgentsAPI.get({
		itemId,
	}),
});

const addTeamAgent = ({ parentId, itemInstance }) =>
	AgentsAPI.patch({
		id: itemInstance.agent.id,
		changes: {
			team: {
				id: parentId,
			},
		},
	});

const deleteTeamAgent = ({ id }) =>
	AgentsAPI.patch({
		id,
		changes: {
			team: {
				id: null,
			},
		},
	});

const updateTeamAgent = async ({ parentId, itemId, itemInstance }) => {
	await addTeamAgent({
		parentId,
		itemInstance,
	});
	await deleteTeamAgent({
		id: itemId,
	});
};

const TeamAgentsAPI = {
	getList: getTeamAgentsList,
	get: getTeamAgent,
	add: addTeamAgent,
	update: updateTeamAgent,
	delete: deleteTeamAgent,
};

export default TeamAgentsAPI;
