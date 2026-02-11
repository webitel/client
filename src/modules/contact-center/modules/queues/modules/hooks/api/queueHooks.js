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
import { QueueHookServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueHookService = new QueueHookServiceApiFactory(
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
	queueId: parentId,
});

const getQueueHooksList = async (params) => {
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
		const response = await queueHookService.searchQueueHook(
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

const getQueueHook = async ({ parentId, itemId: id }) => {
	const defaultObject = {
		event: '',
		properties: [],
		schema: {},
		enabled: false,
	};

	try {
		const response = await queueHookService.readQueueHook(parentId, id);
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

const addQueueHook = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await queueHookService.createQueueHook(parentId, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchQueueHook = async ({ changes, id, parentId }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await queueHookService.patchQueueHook(parentId, id, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateQueueHook = async ({ itemInstance, itemId: id, parentId }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await queueHookService.updateQueueHook(parentId, id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteQueueHook = async ({ parentId, id }) => {
	try {
		const response = await queueHookService.deleteQueueHook(parentId, id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const QueueHooksAPI = {
	getList: getQueueHooksList,
	get: getQueueHook,
	add: addQueueHook,
	patch: patchQueueHook,
	update: updateQueueHook,
	delete: deleteQueueHook,
};

export default QueueHooksAPI;
