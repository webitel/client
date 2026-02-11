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
import { TeamTriggerServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const flowSchemaService = new TeamTriggerServiceApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'name',
	'schema',
	'enabled',
	'description',
];

const preRequestHandler = (parentId) => (item) => ({
	...item,
	teamId: parentId,
});

const getTeamFlowSchemasList = async (params) => {
	const defaultObject = {
		enabled: false,
	};

	const { page, size, search, sort, fields, id, enabled, parentId } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
		]);

	try {
		const response = await flowSchemaService.searchTeamTrigger(
			parentId,
			page,
			size,
			search,
			sort,
			fields,
			enabled,
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

const getTeamFlowSchema = async ({ parentId, itemId: id }) => {
	const defaultObject = {
		name: '',
		description: '',
		enabled: false,
		schema: {},
	};

	try {
		const response = await flowSchemaService.readTeamTrigger(parentId, id);
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

const addTeamFlowSchema = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await flowSchemaService.createTeamTrigger(parentId, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchTeamFlowSchema = async ({ changes, id, parentId }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await flowSchemaService.patchTeamTrigger(
			parentId,
			id,
			body,
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

const updateTeamFlowSchema = async ({ itemInstance, itemId: id, parentId }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await flowSchemaService.updateTeamTrigger(
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

const deleteTeamFlowSchema = async ({ parentId, id }) => {
	try {
		const response = await flowSchemaService.deleteTeamTrigger(parentId, id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const TeamFlowsAPI = {
	getList: getTeamFlowSchemasList,
	get: getTeamFlowSchema,
	add: addTeamFlowSchema,
	update: updateTeamFlowSchema,
	patch: patchTeamFlowSchema,
	delete: deleteTeamFlowSchema,
};

export default TeamFlowsAPI;
