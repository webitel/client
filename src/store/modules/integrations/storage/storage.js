import deepMerge from 'deepmerge';
import StorageAPI from '../../../../api/integrations/storage/storage';
import { DefaultModule } from '../../defaults/DefaultModule';
import Storage from './_internals/enums/Storage.enum';
import defaultStorageState from './_internals/storageSchema/defaults/defaultStorage';
import defaultLocalStorageState from './_internals/storageSchema/localStorage';
import defaultS3StorageState from './_internals/storageSchema/s3Storage';
import defaultBackblazeStorageState from './_internals/storageSchema/backblazeStorage';
import defaultDropboxStorageState from './_internals/storageSchema/dropboxStorage';
import defaultDriveStorageState from './_internals/storageSchema/driveStorage';
import proxy from '../../../../utils/editProxy';

const defaultState = () => ({
  itemId: 0,
  itemInstance: defaultStorageState(),
});

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};


const getters = {};

const actions = {
  ...defaultModule.actions,
  GET_LIST: (context) => {
    return StorageAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return StorageAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return StorageAPI.add(context.state);
  },
  PATCH_ITEM: (context, { id, changes }) => {
    return StorageAPI.patch({ id, changes });
  },
  UPD_ITEM: (context) => {
    return StorageAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return StorageAPI.delete({ id });
  },
  LOAD_ITEM: async (context, type) => {
    if (context.state.itemId) {
      const item = await context.dispatch('GET_ITEM');
      context.dispatch('SET_TYPED_ITEM', { item, type: item.type });
    } else {
      context.dispatch('SET_TYPED_ITEM', { type });
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
    context.commit('SET_ITEM', proxy(item));
  },
  SET_ITEM_PROPERTIES_PROPERTY: (context, payload) => {
    context.commit('SET_ITEM_PROPERTIES_PROPERTY', payload);
    context.dispatch('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
};

const mutations = {
  ...defaultModule.mutations,
  SET_ITEM_PROPERTIES_PROPERTY: (state, { prop, value }) => {
    state.itemInstance.properties[prop] = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
