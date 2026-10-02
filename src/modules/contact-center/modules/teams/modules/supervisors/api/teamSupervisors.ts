import { AgentsAPI } from '@webitel/api-services/api';

/**
 * A team's supervisors are agents filtered by `team` + `isSupervisor`, so adding
 * one is a patch of the agent's own team.
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

const getTeamSupervisorOptions = ({ teamId, ...params }) =>
	AgentsAPI.getSupervisorOptions({
		...params,
		fields: [
			'id',
			'name',
		],
		notTeamId: teamId,
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

export const TeamSupervisorsAPI = {
	getList: getTeamSupervisorsList,
	get: getTeamSupervisor,
	add: addTeamSupervisor,
	update: addTeamSupervisor,
	getTeamSupervisorSubordinatesList,
	getTeamSupervisorOptions,
};
