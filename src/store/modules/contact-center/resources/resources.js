import numbers from './resource-display';
import permissions from './permissions';
import {
    getResourceList, getResource,
    addResource, updateResource, deleteResource, patchResource
} from "../../../../api/contact-center/resources/resources";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => ({
  itemId: 0,
  itemInstance: {
    name: '',
    gateway: {},
    cps: 10,
    limit: 10,
    description: '',
    maxErrors: 2,
    errorIds: [],
  },
});

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    ...defaultModule.actions,

    GET_LIST: (context) => {
        return getResourceList(context.state.page, context.state.size, context.state.search);
    },

    GET_ITEM: (context) => {
        return getResource(context.state.itemId);
    },

    POST_ITEM: (context) => {
        return addResource(context.state.itemInstance);
    },

    PATCH_ITEM: (context, { id, changes }) => {
        return patchResource(id, changes);
    },

    UPD_ITEM: (context) => {
        return updateResource(context.state.itemId, context.state.itemInstance);
    },

    DELETE_ITEM: (context, id) => {
      return deleteResource(id);
    },

    RESET_ITEM_STATE: (context) => {
        context.commit('RESET_ITEM_STATE');
        context.dispatch('ccenter/res/numbers/RESET_STATE', {}, {root: true});
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
    modules: {numbers, permissions}
};
