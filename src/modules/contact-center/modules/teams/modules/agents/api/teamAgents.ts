import { AgentsAPI } from '@webitel/api-services/api';

/**
 * A team's agents are agents filtered by `team`, so adding one is a patch of
 * the agent's own team.
 */
const getTeamAgentsList = ({ parentId, ...params }) =>
	AgentsAPI.getList({
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

export const TeamAgentsAPI = {
	getList: getTeamAgentsList,
	get: getTeamAgent,
	add: addTeamAgent,
	update: addTeamAgent,
};
