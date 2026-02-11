import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	camelToSnake,
	merge,
	mergeEach,
	notify,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { AgentServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const getTeamAgentsList = async (params) => {
	const fields = [
		'id',
		'name',
		'status',
		'supervisor',
		'skills',
	];

	const defaultObject = {
		name: '',
		status: '',
		supervisor: {},
		skills: [],
	};

	const {
		parentId,
		page = 1,
		size = 10,
		search,
		sort,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
	]);

	try {
		const response = await agentService.searchAgent(
			page,
			size,
			search,
			sort,
			fields,
			undefined,
			undefined,
			undefined,
			parentId,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getTeamAgent = async ({ itemId: id }) => {
	const responseHandler = (agent) => ({
		agent,
	});

	try {
		const response = await agentService.readAgent(id);
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
		const response = await agentService.patchAgent(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addTeamAgent = ({ parentId, itemInstance }) => {
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

const deleteTeamAgent = ({ id }) => {
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

const updateTeamAgent = async ({ parentId, itemId, itemInstance }) => {
	try {
		await addTeamAgent({
			parentId,
			itemInstance,
		});
		await deleteTeamAgent({
			id: itemId,
		});
	} catch (err) {
		throw err;
	}
};

const TeamAgentsAPI = {
	getList: getTeamAgentsList,
	get: getTeamAgent,
	add: addTeamAgent,
	update: updateTeamAgent,
	delete: deleteTeamAgent,
};

export default TeamAgentsAPI;
