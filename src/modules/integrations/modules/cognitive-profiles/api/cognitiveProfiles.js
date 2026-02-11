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
import { CognitiveProfileServiceApiFactory } from 'webitel-sdk';
import { MicrosoftRegion } from 'webitel-sdk/esm2015/lookups';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import CognitiveProfileServices from '../lookups/CognitiveProfileServices.lookup';

const cognitiveProfilesService = new CognitiveProfileServiceApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'name',
	'default',
	'enabled',
	'provider',
	'service',
	'description',
	'properties',
];

const preRequestHandler = (item) => {
	const result = {
		...item,
		service: item.service.value,
		properties: {
			...item.properties,
		},
	};
	if (result.properties.region) {
		result.properties.region = item.properties.region.id;
	}
	return result;
};

const getList = async (params) => {
	const defaultObject = {
		default: false,
		enabled: false,
	};

	const { page, size, search, sort, fields, id, service, enabled } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			starToSearch('search'),
		]);

	try {
		const response = await cognitiveProfilesService.searchCognitiveProfile(
			page,
			size,
			search,
			sort,
			fields,
			id,
			service,
			enabled,
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

const get = async ({ itemId: id }) => {
	const defaultObject = {
		properties: {},
	};

	const responseHandler = (response) => {
		const result = {
			...response,
			service: CognitiveProfileServices.find(
				({ value }) => value === response.service,
			),
			properties: {
				...response.properties,
			},
		};
		if (result.properties.region) {
			result.properties.region =
				MicrosoftRegion.find(({ id }) => id === result.properties.region) || {};
		}

		return result;
	};

	try {
		const response = await cognitiveProfilesService.readCognitiveProfile(id);
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

const add = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response =
			await cognitiveProfilesService.createCognitiveProfile(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patch = async ({ changes, id }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await cognitiveProfilesService.patchCognitiveProfile(
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

const update = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await cognitiveProfilesService.updateCognitiveProfile(
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

const deleteItem = async ({ id }) => {
	try {
		const response = await cognitiveProfilesService.deleteCognitiveProfile(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = (params) =>
	getList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const CognitiveProfilesAPI = {
	getList,
	get,
	add,
	patch,
	update,
	delete: deleteItem,
	getLookup,
};

export default CognitiveProfilesAPI;
