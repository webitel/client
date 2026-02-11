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
import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const resGrService = new OutboundResourceGroupServiceApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'groupId',
	'name',
	'description',
	'resource',
	'reserveResource',
	'priority',
];

const preRequestHandler = (parentId) => (item) => ({
	...item,
	groupId: parentId,
});

const getResInGroupList = async (params) => {
	const { page, size, search, sort, fields, id, parentId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await resGrService.searchOutboundResourceInGroup(
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

const getResInGroup = async ({ parentId, itemId: id }) => {
	try {
		const response = await resGrService.readOutboundResourceInGroup(
			parentId,
			id,
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

const addResInGroup = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await resGrService.createOutboundResourceInGroup(
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

const updateResInGroup = async ({ itemInstance, itemId: id, parentId }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await resGrService.updateOutboundResourceInGroup(
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

const deleteResInGroup = async ({ parentId, id }) => {
	try {
		const response = await resGrService.deleteOutboundResourceInGroup(
			parentId,
			id,
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const ResInGroupAPI = {
	getList: getResInGroupList,
	get: getResInGroup,
	add: addResInGroup,
	update: updateResInGroup,
	delete: deleteResInGroup,
};

export default ResInGroupAPI;
