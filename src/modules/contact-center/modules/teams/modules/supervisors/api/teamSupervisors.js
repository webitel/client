import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	camelToSnake,
	merge,
	notify,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { AgentServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const teamSupervisorService = new AgentServiceApiFactory(
	configuration,
	'',
	instance,
);

const getTeamSupervisorsList = async (params) => {
	const isSupervisor = true;
	const fields = [
		'id',
		'name',
	];

	const { page, size, search, parentId, sort } = applyTransform(params, [
		merge(getDefaultGetParams()),
	]);

	try {
		const response = await teamSupervisorService.searchAgent(
			page,
			size,
			search,
			sort,
			fields,
			undefined,
			undefined,
			undefined,
			parentId,
			undefined,
			undefined,
			isSupervisor,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getTeamSupervisor = async ({ itemId: id }) => {
	const responseHandler = (agent) => ({
		agent,
	});

	try {
		const response = await teamSupervisorService.readAgent(id);
		return applyTransform(response.data, [
			snakeToCamel(),
			responseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchAgent = async ({ id, changes }) => {
	const item = applyTransform(changes, [
		camelToSnake(),
	]);
	try {
		const response = await teamSupervisorService.patchAgent(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getTeamSupervisorSubordinatesList = async (params) => {
	const fields = [
		'id',
		'user',
	];

	const { page, size, search, supervisorId, teamId } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await teamSupervisorService.searchAgent(
			page,
			size,
			search,
			undefined,
			fields,
			undefined,
			undefined,
			supervisorId,
			teamId,
			undefined,
			undefined,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addTeamSupervisor = ({ parentId, itemInstance }) => {
	const { id } = itemInstance.agent;
	const changes = {
		team: {
			id: parentId,
		},
	};
	return patchAgent({
		id,
		changes,
	});
};

const deleteTeamSupervisor = ({ id }) => {
	const changes = {
		team: {
			id: null,
		},
	};
	return patchAgent({
		id,
		changes,
	});
};

const updateTeamSupervisor = async ({ parentId, itemId, itemInstance }) => {
	try {
		await addTeamSupervisor({
			parentId,
			itemInstance,
		});
		await deleteTeamSupervisor({
			id: itemId,
		});
	} catch (err) {
		throw err;
	}
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
