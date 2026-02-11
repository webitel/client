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
import { QueueBucketServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueBucketsService = new QueueBucketServiceApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'bucket',
	'priority',
	'queueId',
	'disabled',
];

const preRequestHandler = (parentId) => (item) => ({
	...item,
	queueId: parentId,
});

const getQueueBucketsList = async (params) => {
	const fieldsToSend = [
		'page',
		'size',
		'search',
		'sort',
		'fields',
		'id',
		'parentId',
	];

	const defaultObject = {
		priority: 0,
		disabled: false,
	};

	const { page, size, search, sort, fields, id, parentId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
			sanitize(fieldsToSend),
		],
	);

	try {
		const response = await queueBucketsService.searchQueueBucket(
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

const getQueueBucket = async ({ parentId, itemId: id }) => {
	const defaultObject = {
		priority: 0,
		disabled: false,
	};

	try {
		const response = await queueBucketsService.readQueueBucket(parentId, id);
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

const addQueueBucket = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await queueBucketsService.createQueueBucket(
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

const updateQueueBucket = async ({ itemInstance, itemId: id, parentId }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await queueBucketsService.updateQueueBucket(
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

const patchQueueBucket = async ({ changes, id, parentId }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await queueBucketsService.patchQueueBucket(
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

const deleteQueueBucket = async ({ parentId, id }) => {
	try {
		const response = await queueBucketsService.deleteQueueBucket(parentId, id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const QueueBucketsAPI = {
	getList: getQueueBucketsList,
	get: getQueueBucket,
	add: addQueueBucket,
	update: updateQueueBucket,
	delete: deleteQueueBucket,
	patch: patchQueueBucket,
};

export default QueueBucketsAPI;
