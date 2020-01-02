import {
    addBlacklist, addBlacklistCommunication,
    deleteBlacklist, deleteBlacklistCommunication,
    getBlacklist, getBlacklistCommunication,
    getBlacklistCommunicationList,
    getBlacklistList, updateBlacklist, updateBlacklistCommunication
} from "../../../api/lookups/blacklists";
import proxy from '../../../utils/editProxy';

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: 'default',
            description: 'default',
        },
        numberDataList: [],
        numberSize: '10',
        numberSearch: '',
        numberItemId: 0,
        numberItemInstance: {
            number: '000',
            description: 'default',
        }
    }
};


const state = {
    dataList: [],
    size: '10',
    search: '',
    ...defaultState()
};

const getters = {};

const actions = {
    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await getBlacklistList(state.size, state.search);
        context.commit('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    LOAD_ITEM: async (context) => {
        if (state.itemId) {
            const item = await getBlacklist(state.itemId);
            context.commit('SET_ITEM', proxy(item));
        }
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_ITEM: async (context) => {
        if (!state.itemId) {
            const id = await addBlacklist(state.itemInstance);
            context.dispatch('SET_ITEM_ID', id);
            context.dispatch('LOAD_ITEM');
        }
    },

    UPDATE_ITEM: async (context) => {
        if (state.itemInstance._dirty) {
            await updateBlacklist(state.itemId, state.itemInstance);
            context.dispatch('LOAD_ITEM');
        }
    },

    REMOVE_ITEM: async (context, index) => {
        const id = state.dataList[index].id;
        context.commit('REMOVE_ITEM', index);
        try {
            await deleteBlacklist(id);
        } catch {
        }
    },

    SET_NUMBER_ITEM_ID: (context, id) => {
        context.commit('SET_NUMBER_ITEM_ID', id);
    },

    LOAD_NUMBER_DATA_LIST: async (context) => {
        if (state.itemId) {
            const response = await getBlacklistCommunicationList(state.itemId, state.numberSize, state.numberSearch);
            context.commit('SET_NUMBER_DATA_LIST', response);
        } else {
            context.commit('SET_NUMBER_DATA_LIST', []);
        }
        context.dispatch('SET_NUMBER_ITEM_ID', 0);
    },

    SET_NUMBER_SIZE: (context, size) => {
        context.commit('SET_NUMBER_SIZE', size);
    },

    SET_NUMBER_SEARCH: (context, search) => {
        context.commit('SET_NUMBER_SEARCH', search);
    },

    LOAD_NUMBER_ITEM: async (context) => {
        if (state.numberItemId) {
            const item = await getBlacklistCommunication(state.itemId, state.numberItemId);
            context.commit('SET_NUMBER_ITEM', proxy(item));
        } else {
            context.commit('SET_NUMBER_ITEM', {number: '000', description: '0101'});
        }
    },

    SET_NUMBER_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_NUMBER_ITEM_PROPERTY', payload);
    },

    ADD_NUMBER_ITEM: async (context) => {
        await addBlacklistCommunication(state.itemId, state.numberItemInstance);
        context.dispatch('LOAD_NUMBER_DATA_LIST', state.itemId);
    },

    UPDATE_NUMBER_ITEM: async (context) => {
        await updateBlacklistCommunication(state.itemId, state.numberItemId, state.numberItemInstance);
        context.dispatch('LOAD_NUMBER_DATA_LIST', state.itemId);
    },

    REMOVE_NUMBER_ITEM: async (context, index) => {
        const id = state.numberDataList[index].id;
        context.commit('REMOVE_NUMBER_ITEM', index);
        try {
            await deleteBlacklistCommunication(state.itemId, id);
        } catch {}
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },
};

const mutations = {
    SET_ITEM_ID: (state, id) => {
        state.itemId = id;
    },

    SET_DATA_LIST: (state, list) => {
        state.dataList = list;
    },

    SET_SIZE: (context, size) => {
        state.size = size;
    },

    SET_SEARCH: (context, search) => {
        state.search = search;
    },

    SET_ITEM_PROPERTY: (state, {prop, value}) => {
        state.itemInstance[prop] = value;
    },

    SET_ITEM: (state, item) => {
        state.itemInstance = item;
    },

    REMOVE_ITEM: (state, index) => {
        state.dataList.splice(index, 1);
    },

    SET_NUMBER_DATA_LIST: (state, list) => {
        state.numberDataList = list;
    },

    SET_NUMBER_SIZE: (context, size) => {
        state.numberSize = size;
    },

    SET_NUMBER_SEARCH: (context, search) => {
        state.numberSearch = search;
    },

    SET_NUMBER_ITEM_ID: (state, id) => {
        state.numberItemId = id;
    },

    SET_NUMBER_ITEM: (state, item) => {
        state.numberItemInstance = item;
    },

    SET_NUMBER_ITEM_PROPERTY: (state, {prop, value}) => {
        state.numberItemInstance[prop] = value;
    },

    REMOVE_NUMBER_ITEM: (state, index) => {
        state.dataList.splice(index, 1);
    },

    RESET_ITEM_STATE: (state) => {
        Object.assign(state, defaultState());
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
