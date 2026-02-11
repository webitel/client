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
import { TeamHookServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const teamHookService = new TeamHookServiceApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'event',
	'properties',
	'schema',
	'enabled',
];

const preRequestHandler = (parentId) => (item) => ({
	...item,
	teamId: parentId,
});

const getTeamHooksList = async (params) => {
	const defaultObject = {
		enabled: false,
	};

	const { page, size, search, sort, fields, id, parentId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await teamHookService.searchTeamHook(
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

const getTeamHook = async ({ parentId, itemId: id }) => {
	const defaultObject = {
		event: '',
		properties: [],
		schema: {},
		enabled: false,
	};

	try {
		const response = await teamHookService.readTeamHook(parentId, id);
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

const addTeamHook = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await teamHookService.createTeamHook(parentId, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchTeamHook = async ({ changes, id, parentId }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await teamHookService.patchTeamHook(parentId, id, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateTeamHook = async ({ itemInstance, itemId: id, parentId }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await teamHookService.updateTeamHook(parentId, id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteTeamHook = async ({ parentId, id }) => {
	try {
		const response = await teamHookService.deleteTeamHook(parentId, id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const TeamHooksAPI = {
	getList: getTeamHooksList,
	get: getTeamHook,
	add: addTeamHook,
	patch: patchTeamHook,
	update: updateTeamHook,
	delete: deleteTeamHook,
};

export default TeamHooksAPI;
