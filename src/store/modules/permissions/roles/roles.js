import proxy from '../../../../utils/editProxy';
import {addRole, deleteRole, getRole, getRoleList, updateRole} from "../../../../api/permissions/roles/roles";
import {DefaultModule} from "../../defaults/DefaultModule";

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
    return await getRoleList(state.page, state.size, state.search);
  },

  GET_ITEM: async () => {
    return await getRole(state.itemId);
  },

  POST_ITEM: () => {
    return addRole(state.itemInstance);
  },

  UPD_ITEM: async () => {
    await updateRole(state.itemId, state.itemInstance);
  },

  DELETE_ITEM: async (context, id) => {
    await deleteRole(id);
  },

  ...defaultModule.actions,
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
