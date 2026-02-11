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
import { QueueSkillServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueSkillService = new QueueSkillServiceApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'maxCapacity',
	'minCapacity',
	'queueId',
	'lvl',
	'buckets',
	'skill',
	'enabled',
];

const preRequestHandler = (parentId) => (item) => ({
	...item,
	queueId: parentId,
});

export const getQueueSkillsList = async (params) => {
	const fieldsToSend = [
		'page',
		'size',
		'search',
		'sort',
		'fields',
		'id',
		'parentId',
		'skillId',
	];

	const defaultObject = {
		agent: {},
		minCapacity: 0,
		maxCapacity: 0,
		buckets: [],
		lvl: 0,
		enabled: false,
	};

	const { page, size, search, sort, fields, id, parentId, skillId } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
			sanitize(fieldsToSend),
		]);

	try {
		const response = await queueSkillService.searchQueueSkill(
			parentId,
			page,
			size,
			search,
			sort,
			fields,
			id,
			skillId,
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

export const getQueueSkill = async ({ parentId, itemId: id }) => {
	const defaultObject = {
		agent: {},
		minCapacity: 0,
		maxCapacity: 0,
		buckets: [],
		lvl: 0,
		enabled: false,
	};

	try {
		const response = await queueSkillService.readQueueSkill(parentId, id);
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

export const addQueueSkill = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await queueSkillService.createQueueSkill(parentId, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const patchQueueSkill = async ({ changes, id, parentId }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await queueSkillService.patchQueueSkill(
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

export const updateQueueSkill = async ({
	itemInstance,
	itemId: id,
	parentId,
}) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await queueSkillService.updateQueueSkill(
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

export const deleteQueueSkill = async ({ parentId, id }) => {
	try {
		const response = await queueSkillService.deleteQueueSkill(parentId, id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const QueueSkillsAPI = {
	getList: getQueueSkillsList,
	get: getQueueSkill,
	add: addQueueSkill,
	patch: patchQueueSkill,
	update: updateQueueSkill,
	delete: deleteQueueSkill,
};

export default QueueSkillsAPI;
