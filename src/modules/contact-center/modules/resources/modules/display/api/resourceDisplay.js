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
import { OutboundResourceServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const resService = new OutboundResourceServiceApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'display',
	'resourceId',
];

const preRequestHandler = (parentId) => (item) => ({
	...item,
	resourceId: parentId,
});

const getResDisplayList = async (params) => {
	const { page, size, search, sort, fields, id, parentId } = applyTransform(
		params,
		[
			merge(getDefaultGetParams()),
			starToSearch('search'),
		],
	);

	try {
		const response = await resService.searchOutboundResourceDisplay(
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

const getResDisplay = async ({ parentId, itemId: id }) => {
	try {
		const response = await resService.readOutboundResourceDisplay(parentId, id);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addResDisplay = async ({ parentId, itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await resService.createOutboundResourceDisplay(
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

const uploadNumbersFile = async ({ parentId, file, delimiter, map }) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('delimiter', delimiter);
	formData.append('map', map);

	try {
		const response = await instance.post(`/displays/${parentId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
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

const updateResDisplay = async ({ itemInstance, itemId: id, parentId }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler(parentId),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await resService.updateOutboundResourceDisplay(
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

const deleteResDisplay = async ({ parentId, id }) => {
	try {
		const response = await resService.deleteOutboundResourceDisplay(
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

export default {
	getList: getResDisplayList,
	get: getResDisplay,
	add: addResDisplay,
	update: updateResDisplay,
	delete: deleteResDisplay,
	uploadNumbers: uploadNumbersFile,
};
