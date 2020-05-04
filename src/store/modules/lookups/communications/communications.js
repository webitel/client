import proxy from '../../../../utils/editProxy';
import {
    addCommunication, deleteCommunication,
    getCommunication,
    getCommunicationsList, updateCommunication
} from "../../../../api/lookups/communications/communications";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: '',
            code: '',
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
        return await getCommunicationsList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getCommunication(state.itemId);
    },

    POST_ITEM: async () => {
        return await addCommunication(state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateCommunication(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteCommunication(id);
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
