import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { AgentSkillServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const agentSkillService = new AgentSkillServiceApiFactory(
	configuration,
	'',
	instance,
);

const defaultObject = {
	skill: {},
	capacity: 0,
	enabled: false,
};

const getAgentSkillsList = async (params) => {
	const { parentId, page, size, search, sort, fields, id } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await agentSkillService.searchAgentSkill(
			parentId,
			page,
			size,
			search,
			sort,
			fields,
			id,
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

const getAgentSkill = async ({ parentId, itemId: id }) => {
	try {
		const response = await agentSkillService.readAgentSkill(parentId, id);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const fieldsToSend = [
	'capacity',
	'agentId',
	'skill',
	'enabled',
];

const addAgentSkill = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await agentSkillService.createAgentSkill(parentId, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchAgentSkill = async ({ parentId, id, changes }) => {
	const item = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await agentSkillService.patchAgentSkill(
			parentId,
			id,
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateAgentSkill = async ({ parentId, itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await agentSkillService.updateAgentSkill(
			parentId,
			id,
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteAgentSkill = async ({ parentId, id }) => {
	try {
		const response = await agentSkillService.deleteAgentSkill(parentId, id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const AgentSkillsAPI = {
	getList: getAgentSkillsList,
	get: getAgentSkill,
	add: addAgentSkill,
	patch: patchAgentSkill,
	update: updateAgentSkill,
	delete: deleteAgentSkill,
};

export default AgentSkillsAPI;
