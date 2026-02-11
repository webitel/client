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
import deepCopy from 'deep-copy';
import { OutboundResourceServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const resService = new OutboundResourceServiceApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'limit',
	'enabled',
	'rps',
	'maxSuccessivelyErrors',
	'name',
	'errorIds',
	'display',
	'description',
	'resourceId',
	'gateway',
	'patterns',
	'failureDialDelay',
	'parameters',
];

const preRequestHandler = (item) => {
	const copy = deepCopy(item);
	copy.maxSuccessivelyErrors = copy.maxErrors;
	copy.rps = copy.cps;
	return copy;
};

const getResourceList = async (params) => {
	const defaultObject = {
		gateway: null,
		enabled: false,
	};

	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await resService.searchOutboundResource(
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

const getResource = async ({ itemId: id }) => {
	const defaultObject = {
		name: '',
		gateway: {},
		rps: 0,
		limit: 0,
		description: '',
		maxSuccessivelyErrors: 0,
		errorIds: [],
		patterns: [],
		failureDialDelay: 0,
		parameters: {
			cidType: '',
			ignoreEarlyMedia: '',
		},
	};

	const responseHandler = (response) => {
		const copy = deepCopy(response);
		copy.maxErrors = copy.maxSuccessivelyErrors;
		copy.cps = copy.rps;
		copy.parameters = {
			...defaultObject.parameters,
			...copy.parameters,
		};
		return copy;
	};

	try {
		const response = await resService.readOutboundResource(id);
		return applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
			responseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addResource = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await resService.createOutboundResource(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateResource = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await resService.updateOutboundResource(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchResource = async ({ changes, id }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await resService.patchOutboundResource(id, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteResource = async ({ id }) => {
	try {
		const response = await resService.deleteOutboundResource(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getResourcesLookup = (params) =>
	getResourceList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const ResourcesAPI = {
	getList: getResourceList,
	get: getResource,
	add: addResource,
	patch: patchResource,
	update: updateResource,
	delete: deleteResource,
	getLookup: getResourcesLookup,
};

export default ResourcesAPI;
