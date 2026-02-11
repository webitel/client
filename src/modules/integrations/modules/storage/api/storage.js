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
import { BackendProfileServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import AWSRegions from '../store/_internals/lookups/AWSRegions.lookup';
import DigitalOceanRegions from '../store/_internals/lookups/DigitalOceanRegions.lookup';
import StorageTypeAdapter from '../store/_internals/scripts/backendStorageTypeAdapters';

const storageService = new BackendProfileServiceApiFactory(
	configuration,
	'',
	instance,
);

const fieldsToSend = [
	'name',
	'maxSize',
	'priority',
	'properties',
	'expireDays',
	'type',
	'disabled',
];

const preRequestHandler = (item) => {
	const copy = deepCopy(item);
	if (copy.properties.region?.value) {
		copy.properties.region = copy.properties.region.value;
	}
	copy.type = StorageTypeAdapter.enumToBackend(copy.type);
	return copy;
};

const getStorageList = async (params) => {
	const defaultObject = {
		disabled: false,
		maxSize: 0,
		expireDays: 0,
		priority: 0,
	};

	const responseHandler = (response) => {
		const items = response.items.map((item) => ({
			...item,
			type: StorageTypeAdapter.backendToEnum(item.type),
		}));
		return {
			...response,
			items,
		};
	};

	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await storageService.searchBackendProfile(
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
			responseHandler,
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

const getStorage = async ({ itemId: id }) => {
	const defaultObject = {
		maxSize: 0,
		expireDays: 0,
		priority: 0,
	};

	const responseHandler = (response) => {
		const copy = deepCopy(response);
		if (copy.properties.region) {
			if (copy.properties.endpoint.includes('aws')) {
				copy.properties.region = AWSRegions.find(
					(item) => item.value === copy.properties.region,
				);
			} else if (copy.properties.endpoint.includes('digitalocean')) {
				copy.properties.region = DigitalOceanRegions.find(
					(item) => item.value === copy.properties.region,
				);
			}
		}

		return {
			...copy,
			type: StorageTypeAdapter.backendToEnum(copy.type),
		};
	};

	try {
		const response = await storageService.readBackendProfile(id);
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

const addStorage = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await storageService.createBackendProfile(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateStorage = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await storageService.updateBackendProfile(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchStorage = async ({ changes, id }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await storageService.patchBackendProfile(id, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteStorage = async ({ id }) => {
	try {
		const response = await storageService.deleteBackendProfile(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = (params) =>
	getStorageList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const StorageAPI = {
	getList: getStorageList,
	get: getStorage,
	add: addStorage,
	patch: patchStorage,
	update: updateStorage,
	delete: deleteStorage,
	getLookup,
};

export default StorageAPI;
