import {
    addBlacklist, addBlacklistCommunication,
    deleteBlacklist, deleteBlacklistCommunication,
    getBlacklist, getBlacklistCommunication,
    getBlacklistCommunicationList,
    getBlacklistList, updateBlacklist, updateBlacklistCommunication
} from "../../../../api/objects/lookups/blacklists";

const proxy = (item) => new Proxy(item, {
    set(obj, prop, value) {
        obj._dirty = true;
        obj[prop] = value;
        return obj;
    }
});

const state = {
    dataList: [],
    size: '10',
    search: '',
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
        number: '',
        description: ''
    },
};

const getters = {};

const actions = {
    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await getBlacklistList(state.size, state.search);
        context.commit('SET_DATA_LIST', response);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    LOAD_ITEM: async (context) => {
        let item;
        if (state.itemId) {
            item = await getBlacklist(state.itemId);
            item = proxy(item);
        } else {
            item = {
                name: 'default',
                description: 'default',
            };
        }
        context.commit('SET_ITEM', item);
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_ITEM: async (context) => {
        const id = await addBlacklist(state.itemInstance);
        context.dispatch('SET_ITEM_ID', id);
    },

    UPDATE_ITEM: async () => {
        if(state.itemInstance._dirty) {
            await updateBlacklist(state.itemId, state.itemInstance);
        }
    },

    REMOVE_ITEM: async (context, index) => {
        const id = state.dataList[index].id;
        context.commit('REMOVE_ITEM', index);
        try {
            await deleteBlacklist(id);
        } catch {}
    },

    SET_NUMBER_ITEM_ID: (context, id) => {
        context.commit('SET_NUMBER_ITEM_ID', id);
    },

    LOAD_NUMBER_DATA_LIST: async (context) => {
        if(state.itemId) {
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
        let item;
        if (state.numberItemId) {
            item = await getBlacklistCommunication(state.itemId, state.numberItemId);
            item = proxy(item);
        } else {
            item = {
                number: '000',
                description: 'default',
            };
        }
        context.commit('SET_NUMBER_ITEM', item);
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
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
