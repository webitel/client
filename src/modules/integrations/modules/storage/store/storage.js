import deepMerge from 'deepmerge';

import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import StorageAPI from '../api/storage';
import Storage from './_internals/enums/Storage.enum';
import headers from './_internals/headers';
import defaultBackblazeStorageState from './_internals/storageSchema/backblazeStorage';
import defaultStorageState from './_internals/storageSchema/defaults/defaultStorage';
import defaultDriveStorageState from './_internals/storageSchema/driveStorage';
import defaultDropboxStorageState from './_internals/storageSchema/dropboxStorage';
import defaultLocalStorageState from './_internals/storageSchema/localStorage';
import defaultS3StorageState from './_internals/storageSchema/s3Storage';

const resettableState = {
	itemInstance: defaultStorageState(),
};

const actions = {
	LOAD_ITEM: async (context, type) => {
		if (context.state.itemId) {
			const item = await context.dispatch('GET_ITEM');
			context.dispatch('SET_TYPED_ITEM', {
				item,
				type: item.type,
			});
		} else {
			context.dispatch('SET_TYPED_ITEM', {
				type,
			});
		}
	},
	SET_TYPED_ITEM: (context, { type, item = {} }) => {
		switch (type) {
			case Storage.LOCAL:
				item = deepMerge(defaultLocalStorageState(), item);
				break;
			case Storage.S3:
				item = deepMerge(defaultS3StorageState(), item);
				break;
			case Storage.BACKBLAZE:
				item = deepMerge(defaultBackblazeStorageState(), item);
				break;
			case Storage.DROPBOX:
				item = deepMerge(defaultDropboxStorageState(), item);
				break;
			case Storage.DRIVE:
				item = deepMerge(defaultDriveStorageState(), item);
				break;
		}
		context.commit('SET_ITEM', item);
	},
	SET_ITEM_PROPERTIES_PROPERTY: (context, payload) => {
		context.commit('SET_ITEM_PROPERTIES_PROPERTY', payload);
		context.dispatch('SET_ITEM_PROPERTY', {
			prop: '_dirty',
			value: true,
		});
	},
};

const mutations = {
	SET_ITEM_PROPERTIES_PROPERTY: (state, { prop, value }) => {
		state.itemInstance.properties[prop] = value;
	},
};

const storage = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(StorageAPI)
	.generateAPIActions()
	.getModule({
		actions,
		mutations,
	});

export default storage;
