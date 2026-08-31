import { AgentsAPI } from '@webitel/api-services/api';

/**
 * A team's supervisors are agents filtered by `team` + `isSupervisor`, so add
 * and remove are patches of the agent's own team.
 */
const getTeamSupervisorsList = ({ parentId, ...params }) =>
	AgentsAPI.getList({
		...params,
		fields: [
			'id',
			'name',
		],
		team: parentId,
		isSupervisor: true,
	});

const getTeamSupervisor = async ({ itemId }) => ({
	agent: await AgentsAPI.get({
		itemId,
	}),
});

const getTeamSupervisorSubordinatesList = ({
	supervisorId,
	teamId,
	...params
}) =>
	AgentsAPI.getList({
		...params,
		fields: [
			'id',
			'user',
		],
		supervisorId,
		team: teamId,
	});

const addTeamSupervisor = ({ parentId, itemInstance }) =>
	AgentsAPI.patch({
		id: itemInstance.agent.id,
		changes: {
			team: {
				id: parentId,
			},
		},
	});

const deleteTeamSupervisor = ({ id }) =>
	AgentsAPI.patch({
		id,
		changes: {
			team: {
				id: null,
			},
		},
	});

const updateTeamSupervisor = async ({ parentId, itemId, itemInstance }) => {
	await addTeamSupervisor({
		parentId,
		itemInstance,
	});
	await deleteTeamSupervisor({
		id: itemId,
	});
};

const TeamSupervisorsAPI = {
	getList: getTeamSupervisorsList,
	get: getTeamSupervisor,
	add: addTeamSupervisor,
	update: updateTeamSupervisor,
	delete: deleteTeamSupervisor,
	getTeamSupervisorSubordinatesList,
};

export default TeamSupervisorsAPI;
