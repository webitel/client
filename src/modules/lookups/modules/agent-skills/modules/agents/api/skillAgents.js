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
import { SkillServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const skillService = new SkillServiceApiFactory(configuration, '', instance);

const defaultObject = {
	agent: {},
	skill: {},
	team: {},
	capacity: 10,
	enabled: false,
};

const getAgentSkillsList = async (params) => {
	const { parentId, page, size, search, sort, fields, id, agentId } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
		]);

	try {
		const response = await skillService.searchSkillAgent(
			parentId,
			page,
			size,
			search,
			sort,
			fields,
			id,
			agentId,
		);
		const { items, next, aggs } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
			aggs,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getAgentSkill = async ({ parentId, itemId: id }) => {
	try {
		const response = await skillService.readSkill(id, parentId);
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
	'skill',
	'team',
	'enabled',
	'agent',
	'user',
	'q',
];

const addAgentSkill = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await skillService.createSkillAgent(parentId, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchAgentSkill = async ({ parentId, changes, id, q }) => {
	const sanitizedChanges = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
		starToSearch('q'),
	]);
	try {
		const response = await skillService.patchSkillAgent(parentId, {
			...sanitizedChanges,
			id,
		});
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateAgentSkill = async ({ id, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await skillService.updateSkill(id, item);
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
	const itemId = {
		id: [
			id,
		],
	};
	try {
		const response = await skillService.deleteSkillAgent(parentId, itemId);
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
