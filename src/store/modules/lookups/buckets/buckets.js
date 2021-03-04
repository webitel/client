import {
  addBucket,
  deleteBucket,
  getBucket,
  getBucketsList,
  updateBucket,
} from "../../../../api/lookups/buckets/buckets";
import { DefaultModule } from "../../defaults/DefaultModule";
import DefaultPermissionsModule from '../../defaults/DefaultPermissionsModule';

const defaultState = () => {
  return {
    itemId: 0,
    itemInstance: {
      name: '',
      description: '',
    },
  };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  GET_LIST: async () => {
    return await getBucketsList(state.page, state.size, state.search);
  },

  GET_ITEM: async () => {
    return await getBucket(state.itemId);
  },

  POST_ITEM: async () => {
    return await addBucket(state.itemInstance);
  },

  UPD_ITEM: async () => {
    await updateBucket(state.itemId, state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    await deleteBucket(id);
  },

  ...defaultModule.actions,
};

const mutations = {
  ...defaultModule.mutations,
};

const PERMISSIONS_API_URL = '/call_center/buckets';
const permissions = new DefaultPermissionsModule()
  .generateAPIMethods(PERMISSIONS_API_URL)
  .getModule();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { permissions },
};
