import RolesAPI from '../../../../api/permissions/roles/roles';
import { DefaultModule } from '../../defaults/DefaultModule';

const defaultState = () => {
  return {
    itemId: 0,
    itemInstance: {
      name: '',
      description: '',
      permissions: [],
    },
  };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,
  GET_LIST: (context) => {
    return RolesAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return RolesAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return RolesAPI.add(context.state);
  },
  UPD_ITEM: (context) => {
    return RolesAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return RolesAPI.delete({ id });
  },
  ADD_ROLE_PERMISSION: (context, permission) => {
    const value = context.state.itemInstance.permissions.concat(permission);
    context.commit('SET_ITEM_PROPERTY', { prop: 'permissions', value });
  },
  UPDATE_ROLE_PERMISSION: (context, { index, permission }) => {
    const value = [...context.state.itemInstance.permissions];
    value.splice(index, 1, permission);
    context.commit('SET_ITEM_PROPERTY', { prop: 'permissions', value });
  },
  REMOVE_ROLE_PERMISSION: (context, index) => {
    const value = [...context.state.itemInstance.permissions];
    value.splice(index, 1);
    context.commit('SET_ITEM_PROPERTY', { prop: 'permissions', value });
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
};
