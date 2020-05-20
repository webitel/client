import {
    addBlacklistCommunication,
    deleteBlacklistCommunication,
    getBlacklistCommunication,
    getBlacklistCommunicationList,
    updateBlacklistCommunication
} from "../../../../api/lookups/blacklists/blacklistNumbers";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 1,
        isNextPage: false,
        itemId: 0,
        itemInstance: {
            number: '',
            description: '',
        }
    }
};


const defaultModule = new DefaultNestedModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getBlacklistCommunicationList(state.parentId, state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getBlacklistCommunication(state.parentId, state.itemId);
    },

    POST_ITEM: async () => {
        return await addBlacklistCommunication(state.parentId, state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateBlacklistCommunication(state.parentId, state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteBlacklistCommunication(state.parentId, id);
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
