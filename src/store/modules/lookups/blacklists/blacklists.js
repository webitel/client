import {
    addBlacklist, deleteBlacklist, getBlacklist,
    getBlacklistList, updateBlacklist
} from "../../../../api/lookups/blacklists";
import numbers from './blacklistNumbers';
import proxy from "../../../../utils/editProxy";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: 'default',
            description: 'default',
        },
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
    GET_LIST: async () => {
        return await getBlacklistList(state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getBlacklist(state.itemId);
    },

    POST_ITEM: async () => {
        return await addBlacklist(state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateBlacklist(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteBlacklist(id);
    },

    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await context.dispatch('GET_LIST');
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
            const item = await context.dispatch('GET_ITEM');
            context.commit('SET_ITEM', proxy(item));
        }
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_ITEM: async (context) => {
        if (!state.itemId) {
            const id = await context.dispatch('POST_ITEM');
            context.dispatch('SET_ITEM_ID', id);
            context.dispatch('LOAD_ITEM');
        }
    },

    UPDATE_ITEM: async (context) => {
        if (state.itemInstance._dirty) {
            await context.dispatch('UPD_ITEM');
            context.dispatch('LOAD_ITEM');
        }
    },

    REMOVE_ITEM: async (context, index) => {
        const id = state.dataList[index].id;
        context.commit('REMOVE_ITEM', index);
        try {
            await context.dispatch('DELETE_ITEM', id);
        } catch {
        }
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
    modules: {numbers}
};
