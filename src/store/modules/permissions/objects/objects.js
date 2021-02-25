import obac from './modules/obac/object-obac';
import rbac from './modules/rbac/object-rbac';
import { DefaultModule } from '../../defaults/DefaultModule';
import {
  getObject,
  getObjectList,
  patchObject,
} from '../../../../api/permissions/objects/objects';

const defaultState = () => ({
  itemId: 0,
  itemInstance: {},
});
const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,

  GET_LIST: (context) => getObjectList(context.state.search, context.state.page, context.state.size),

  GET_ITEM: (context) => getObject(context.state.itemId),

  PATCH_ITEM: (context, { id, changes }) => patchObject(id, changes),

  TOGGLE_OBJECT_OBAC: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'obac', ...payload }),
  TOGGLE_OBJECT_RBAC: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'rbac', ...payload }),

  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('permissions/objects/obac/RESET_ITEM_STATE', {}, { root: true });
    context.dispatch('permissions/objects/rbac/RESET_ITEM_STATE', {}, { root: true });
  },
};

const mutations = {
  ...defaultModule.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { obac, rbac },
};
