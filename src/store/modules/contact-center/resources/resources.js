import proxy from '../../../../utils/editProxy';
import numbers from './resource-display';
import permissions from './permissions';
import {
    getResourceList, getResource,
    addResource, updateResource, deleteResource, patchResource
} from "../../../../api/contact-center/resources/resources";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: 'test',
            gateway: {id: 1},
            cps: 10,
            limit: 10,
            description: 'test',
            maxErrors: 2,
            errorIds: [{name: '2xx'}],
        },
    };
};

const state = {
    dataList: [],
    size: '10',
    search: '',
    page: 0,
    isNextPage: true,
    ...defaultState()
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getResourceList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getResource(state.itemId);
    },

    POST_ITEM: async () => {
        return await addResource(state.itemInstance);
    },

    PATCH_ITEM: async (context, {id, changes}) => {
        return await patchResource(id, changes);
    },

    UPD_ITEM: async () => {
        await updateResource(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteResource(id);
    },

    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
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

    TOGGLE_ITEM_PROPERTY: async (context, {index, prop}) => {
        await context.commit('TOGGLE_ITEM_PROPERTY', {index, prop});
        let changes = {};
        changes[prop] = state.dataList[index][prop];
        try {
            await context.dispatch('PATCH_ITEM', {id: state.dataList[index].id, changes});
        } catch  {
            context.dispatch('LOAD_DATA_LIST');
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
        context.dispatch('ccenter/res/numbers/RESET_ITEM_STATE', {}, {root: true});
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

    INCREMENT_PAGE: (state) => {
        state.page++;
    },

    DECREMENT_PAGE: (state) => {
        state.page--;
    },

    SET_ITEM_PROPERTY: (state, {prop, value}) => {
        state.itemInstance[prop] = value;
    },

    TOGGLE_ITEM_PROPERTY: (state, {index, prop}) => {
        state.dataList[index][prop] = !state.dataList[index][prop];
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
    modules: {numbers, permissions}
};
