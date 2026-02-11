import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { QueueResourcesServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueResService = new QueueResourcesServiceApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'resourceGroup',
	'queueId',
	'communication',
];

const preRequestHandler = (item, parentId) => ({
	...item,
	queueId: parentId,
});

const getQueueResGroupsList = async (params) => {
	const { parentId, page, size, search, sort, fields, id } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await queueResService.searchQueueResourceGroup(
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
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getQueueResGroup = async ({ parentId, itemId: id, domainId }) => {
	try {
		const response = await queueResService.readQueueResourceGroup(
			parentId,
			id,
			domainId,
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

const addQueueResGroup = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await queueResService.createQueueResourceGroup(
			parentId,
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

const updateQueueResGroup = async ({ parentId, itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await queueResService.updateQueueResourceGroup(
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

const deleteQueueResGroup = async ({ parentId, id, domainId }) => {
	try {
		const response = await queueResService.deleteQueueResourceGroup(
			parentId,
			id,
			domainId,
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const QueueResourceGroupsAPI = {
	getList: getQueueResGroupsList,
	get: getQueueResGroup,
	add: addQueueResGroup,
	update: updateQueueResGroup,
	delete: deleteQueueResGroup,
};

export default QueueResourceGroupsAPI;
