import proxy from '../../../utils/editProxy';
import {
    addDevice,
    deleteDevice,
    getDevice,
    getDeviceHistory,
    getDeviceList, updateDevice
} from "../../../api/directory/devices";

const defaultState = () => {
    return {
        itemId: 0,
        historyDate: Date.now(),
        itemInstance: {
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
        },
    };
};

const state = {
    dataList: [],
    size: '10',
    search: '',
    historyDataList: [],
    historySize: '10',
    historySearch: '',
    ...defaultState()
};

const getters = {};

const actions = {
    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await getDeviceList(state.size, state.search);
        context.commit('RESET_ITEM_STATE');
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
        if (state.itemId) {
            const item = await getDevice(state.itemId);
            context.commit('SET_ITEM', proxy(item));
        }
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_ITEM: async (context) => {
        if(!state.itemId) {
            const id = await addDevice(state.itemInstance);
            context.dispatch('SET_ITEM_ID', id);
            context.dispatch('LOAD_ITEM');
        }
    },

    UPDATE_ITEM: async (context) => {
        if (state.itemInstance._dirty) {
            await updateDevice(state.itemId, state.itemInstance);
            context.dispatch('LOAD_ITEM');
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
};
