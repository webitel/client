import {getAgentHistory} from "../../../../api/contact-center/agents/agents";

const defaultState = () => {
    return {
        date: Date.now(),
    };
};

const state = {
    dataList: [],
    size: '10',
    search: '',
    page: 0,
    isNextPage: true,
    itemId: 0,
    ...defaultState()
};

const getters = {};

const actions = {
    SET_HISTORY_ITEM_ID: (context, id) => {
        context.commit('SET_HISTORY_ITEM_ID', id);
    },

    LOAD_HISTORY_DATA_LIST: async (context) => {
        const response = await getAgentHistory(state.itemId, state.date, state.page, state.size);
        context.dispatch('RESET_ITEM_STATE', response);
        context.commit('LOAD_HISTORY_DATA_LIST', response);
    },

    SET_HISTORY_SIZE: (context, size) => {
        context.commit('SET_HISTORY_SIZE', size);
    },

    SET_HISTORY_SEARCH: (context, search) => {
        context.commit('SET_HISTORY_SEARCH', search);
    },

    NEXT_HISTORY_PAGE: (context) => {
        if(state.isNextPage) {
            context.commit('INCREMENT_HISTORY_PAGE');
            context.dispatch('LOAD_HISTORY_DATA_LIST');
        }
    },

    PREV_HISTORY_PAGE: (context) => {
        if(state.page) {
            context.commit('DECREMENT_HISTORY_PAGE');
            context.dispatch('LOAD_HISTORY_DATA_LIST');
        }
    },

    SET_HISTORY_DATE: (context, date) => {
        context.commit('SET_HISTORY_DATE', date)
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },
};

const mutations = {
    SET_HISTORY_ITEM_ID: (state, id) => {
        state.itemId = id;
    },

    LOAD_HISTORY_DATA_LIST: (state, list) => {
        state.dataList = list;
    },

    SET_HISTORY_SIZE: (state, size) => {
        state.size = size;
    },

    SET_HISTORY_SEARCH: (state, search) => {
        state.search = search;
    },

    INCREMENT_HISTORY_PAGE: (state) => {
        state.page++;
    },

    DECREMENT_HISTORY_PAGE: (state) => {
        state.page--;
    },

    SET_HISTORY_DATE: (state, date) => {
        state.date = date;
    },

    RESET_ITEM_STATE: (state) => {
        Object.assign(state, defaultState());
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
