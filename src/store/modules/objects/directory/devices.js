import proxy from '../../../../utils/editProxy';
import {
    addDevice,
    deleteDevice,
    getDevice,
    getDeviceHistory,
    getDeviceList, updateDevice
} from "../../../../api/objects/directory/devices";

const defaultItem = {
    name: 'device name',
    account: '1002',
    password: 'pass',
    user: '',
    phone: '8 800 555 3535',
    ip: '10.10.10.117',

    vendor: 'vendor name',
    model: 'model name',
    mac: '80-5E-C0-3C-84-44',
    hotdesk: [],
    vars: [],
};

const state = {
    dataList: [],
    size: '10',
    search: '',
    itemId: 0,
    historyDate: Date.now(),
    historyDataList: [],
    historySize: '0',
    historySearch: '0',
    itemInstance: {
        name: '',
        account: '',
        password: '',
        user: '',
        phone: '',
        ip: '',
        vendor: '',
        model: '',
        mac: '',
        hotdesk: [],
        vars: [],
    },
};

const getters = {};

const actions = {
    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await getDeviceList(state.size, state.search);
        context.commit('SET_DATA_LIST', response);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    LOAD_HISTORY_DATA_LIST: async (context) => {
        const response = await getDeviceHistory(state.itemId, state.historyDate);
        context.commit('LOAD_HISTORY_DATA_LIST', response);
    },

    SET_HISTORY_SIZE: (context, size) => {
        context.commit('SET_HISTORY_SIZE', size);
    },

    SET_HISTORY_SEARCH: (context, search) => {
        context.commit('SET_HISTORY_SEARCH', search);
    },

    SET_HISTORY_DATE: (context, date) => {
        context.commit('SET_HISTORY_DATE', date)
    },

    LOAD_ITEM: async (context) => {
        let item;
        if (state.itemId) {
            item = await getDevice(state.itemId);
            item = proxy(item);
        } else {
            item = defaultItem;
        }
        context.commit('SET_ITEM', item);
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_ITEM: async (context) => {
        const id = await addDevice(state.itemInstance);
        context.dispatch('SET_ITEM_ID', id);
    },

    UPDATE_ITEM: async () => {
        if (state.itemInstance._dirty) {
            await updateDevice(state.itemId, state.itemInstance);
        }
    },

    REMOVE_ITEM: async (context, index) => {
        const id = state.dataList[index].id;
        context.commit('REMOVE_ITEM', index);
        try {
            await deleteDevice(id);
        } catch {
        }
    },
};

const mutations = {
    SET_ITEM_ID: (state, id) => {
        state.itemId = id;
    },

    SET_DATA_LIST: (state, list) => {
        state.dataList = list;
    },

    SET_SIZE: (state, size) => {
        state.size = size;
    },

    SET_SEARCH: (state, search) => {
        state.search = search;
    },

    LOAD_HISTORY_DATA_LIST: (state, list) => {
        state.historyDataList = list;
    },

    SET_HISTORY_SIZE: (state, size) => {
        state.historySize = size;
    },

    SET_HISTORY_SEARCH: (state, search) => {
        state.historySearch = search;
    },

    SET_HISTORY_DATE: (state, date) => {
        state.historyDate = date;
    },

    SET_ITEM_PROPERTY: (state, {prop, value}) => {
        state.itemInstance[prop] = value;
    },

    ADD_VARIABLE_PAIR: (state, pair) => {
        state.itemInstance.variables.unshift(pair);
    },

    SET_VARIABLE_PROP: (state, {index, prop, value}) => {
        state.itemInstance.variables[index][prop] = value;
    },

    DELETE_VARIABLE_PAIR: (state, index) => {
        state.itemInstance.variables.splice(index, 1);
    },

    PATCH_ITEM_PEROPERTY: (state, {value, index}) => {
        state.dataList[index].status = value;
    },

    TOGGLE_ITEM_PROPERTY: (state, index) => {
        state.dataList[index].dnd = !state.dataList[index].dnd;
    },

    SET_ITEM: (state, item) => {
        state.itemInstance = item;
    },

    REMOVE_ITEM: (state, index) => {
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
