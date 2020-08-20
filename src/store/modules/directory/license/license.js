import {getLicenseList, updateLicense} from "../../../../api/directory/license/license";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
        key: '',
    };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getLicenseList(state.page, state.size, state.search);
    },

    UPD_ITEM: async () => {
        return await updateLicense(state.key);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await context.dispatch('GET_LIST');
        context.dispatch('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    NEXT_PAGE: (context) => {
        if (state.isNextPage) {
            context.commit('INCREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    PREV_PAGE: (context) => {
        if (state.page) {
            context.commit('DECREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    SET_KEY_PROPERTY: (context, value) => {
        context.commit('SET_KEY_PROPERTY', value);
    },

    UPDATE_ITEM: async (context) => {
        await context.dispatch('UPD_ITEM');
        context.dispatch('LOAD_DATA_LIST');
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },
};

const mutations = {
    ...defaultModule.mutations,

    SET_KEY_PROPERTY: (state, value) => {
        state.key = value;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
