import {getAgentQueuesList} from "../../../../api/contact-center/agents/agents";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 0,
        isNextPage: true,
    };
};

const state = {
    parentId: 0,
    ...defaultState()
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getAgentQueuesList(state.parentId, state.page, state.size, state.search);
    },

    SET_PARENT_ITEM_ID: (context, id) => {
        context.commit('SET_PARENT_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        if(state.parentId) {
            const response = await context.dispatch('GET_LIST');
            context.dispatch('RESET_ITEM_STATE');
            context.commit('SET_DATA_LIST', response);
        }
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    NEXT_PAGE: (context) => {
        if(state.isNextPage) {
            context.commit('INCREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    PREV_PAGE: (context) => {
        if(state.page) {
            context.commit('DECREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },
};

const mutations = {
    SET_PARENT_ITEM_ID: (state, id) => {
        state.parentId = id;
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

    INCREMENT_PAGE: (state) => {
        state.page++;
    },

    DECREMENT_PAGE: (state) => {
        state.page--;
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
