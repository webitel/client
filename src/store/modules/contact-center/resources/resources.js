import numbers from './resource-display';
import permissions from './permissions';
import {
    getResourceList, getResource,
    addResource, updateResource, deleteResource, patchResource
} from "../../../../api/contact-center/resources/resources";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
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
    };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    ...defaultModule.actions,

    GET_LIST: async () => {
        return await getResourceList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getResource(state.itemId);
    },

    POST_ITEM: async () => {
        return await addResource(state.itemInstance);
    },

    PATCH_ITEM: async (context, {id, changes}) => {
        return await patchResource(id, changes);
    },

    UPD_ITEM: async () => {
        await updateResource(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteResource(id);
    },

    RESET_ITEM_STATE: async (context) => {
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
