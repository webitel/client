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
import { AgentPauseCauseServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const pauseCauseService = new AgentPauseCauseServiceApiFactory(
	configuration,
	'',
	instance,
);

const getPauseCauseList = async (params) => {
	const defaultObject = {
		name: '',
		limitMin: 0,
		allowAdmin: false,
		allowSupervisor: false,
		allowAgent: false,
	};

	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		camelToSnake(),
	]);

	try {
		const response = await pauseCauseService.searchAgentPauseCause(
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

const getPauseCause = async ({ itemId: id }) => {
	const defaultObject = {
		name: '',
		limitMin: 0,
		allowAdmin: false,
		allowSupervisor: false,
		allowAgent: false,
	};

	try {
		const response = await pauseCauseService.readAgentPauseCause(id);
		return applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const fieldsToSend = [
	'name',
	'limitMin',
	'allowAdmin',
	'allowSupervisor',
	'allowAgent',
	'description',
];

const addPauseCause = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await pauseCauseService.createAgentPauseCause(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchPauseCause = async ({ id, changes }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await pauseCauseService.patchAgentPauseCause(id, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};
const updatePauseCause = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await pauseCauseService.updateAgentPauseCause(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deletePauseCause = async ({ id }) => {
	try {
		const response = await pauseCauseService.deleteAgentPauseCause(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getPauseCauseLookup = (params) =>
	getPauseCauseList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const AgentPauseCauseAPI = {
	getList: getPauseCauseList,
	get: getPauseCause,
	add: addPauseCause,
	patch: patchPauseCause,
	update: updatePauseCause,
	delete: deletePauseCause,
	getLookup: getPauseCauseLookup,
};

export default AgentPauseCauseAPI;
