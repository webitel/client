import { BackendProfilesAPI } from '@webitel/api-services/api';
import deepCopy from 'deep-copy';

import AWSRegions from '../store/_internals/lookups/AWSRegions.lookup';
import DigitalOceanRegions from '../store/_internals/lookups/DigitalOceanRegions.lookup';
import StorageTypeAdapter from '../store/_internals/scripts/backendStorageTypeAdapters';

/**
 * The shared client speaks the backend's `type` string and a bare
 * `properties.region`. The form binds a UI enum and a region option object, so
 * the translation between the two lives here with the lookups it needs.
 */
const toBackend = (item) => {
	const copy = deepCopy(item);
	if (copy.properties.region?.value) {
		copy.properties.region = copy.properties.region.value;
	}
	copy.type = StorageTypeAdapter.enumToBackend(copy.type);
	return copy;
};

const getStorageList = async (params) => {
	const { items, next } = await BackendProfilesAPI.getList(params);
	return {
		items: items.map((item) => ({
			...item,
			type: StorageTypeAdapter.backendToEnum(item.type),
		})),
		next,
	};
};

const getStorage = async ({ itemId }) => {
	const item = await BackendProfilesAPI.get({
		itemId,
	});
	const copy = deepCopy(item);

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

const addStorage = ({ itemInstance }) =>
	BackendProfilesAPI.add({
		itemInstance: toBackend(itemInstance),
	});

const updateStorage = ({ itemInstance, itemId }) =>
	BackendProfilesAPI.update({
		itemInstance: toBackend(itemInstance),
		itemId,
	});

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
	patch: (params) => BackendProfilesAPI.patch(params),
	update: updateStorage,
	delete: (params) => BackendProfilesAPI.delete(params),
	getLookup,
};

export default StorageAPI;
