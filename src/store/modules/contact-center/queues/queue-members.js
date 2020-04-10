import proxy from '../../../../utils/editProxy';
import communications from './queue-member-communications';
import {
    addMember, deleteMember,
    getMember, getMembersList, updateMember
} from "../../../../api/contact-center/queues/queueMembers";

const defaultState = () => {
    return {
        _dirty: false,
        destinationId: 0,
        itemId: 0,
        itemInstance: {
            name: 'memberr',
            priority: '0',
            expireAt: Date.now(),
            bucket: {},
            skill: {},
            timezone: {},
            communications: [],
            // skills: [{text: 'skill1'}, {text: 'skill2'}],
            variables: [{key: 'Ke1y', value: 'Valu2e'}, {key: 'K3ey', value: 'Va4lue'},],
        },
    };
};

const state = {
    parentId: 0,
    dataList: [],
    size: '10',
    search: '',
    page: 0,
    isNextPage: true,
    ...defaultState()
};

const getters = {
    GET_ITEM_DESTINATIONS: (state) => {
        const item = state.dataList.filter(item => item.id === state.destinationId)[0];
        return item.communications;
    },
};

const actions = {
    GET_LIST: async () => {
        return await getMembersList(state.parentId, state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getMember(state.parentId, state.itemId);
    },

    POST_ITEM: async () => {
        return await addMember(state.parentId, state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateMember(state.parentId, state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteMember(state.parentId, id);
    },

    SET_PARENT_ITEM_ID: (context, id) => {
        context.commit('SET_PARENT_ITEM_ID', id);
    },

    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        if (state.parentId) {
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

    SET_DESTINATION_ID: async (context, id) => {
        context.commit('SET_DESTINATION_ID', id);
    },

    ADD_COMMUNICATION_ITEM: (context, item) => {
        context.commit('ADD_COMMUNICATION_ITEM', item);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    UPDATE_COMMUNICATION_ITEM: (context, {index, item}) => {
        context.commit('UPDATE_COMMUNICATION_ITEM', {index, item});
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    REMOVE_COMMUNICATION_ITEM: async (context, index) => {
        context.commit('REMOVE_COMMUNICATION_ITEM', index);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    ADD_VARIABLE_PAIR: (context) => {
        const pair = {key: '', value: ''};
        context.commit('ADD_VARIABLE_PAIR', pair);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    SET_VARIABLE_PROP: (context, {index, prop, value}) => {
        context.commit('SET_VARIABLE_PROP', {index, prop, value});
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    DELETE_VARIABLE_PAIR: (context, index) => {
        context.commit('DELETE_VARIABLE_PAIR', index);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },
};

const mutations = {
    SET_PARENT_ITEM_ID: (state, id) => {
        state.parentId = id;
    },

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

    INCREMENT_PAGE: (state) => {
        state.page++;
    },

    DECREMENT_PAGE: (state) => {
        state.page--;
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

    SET_DESTINATION_ID: (state, id) => {
        state.destinationId = id;
    },

    ADD_COMMUNICATION_ITEM: (state, item) => {
        state.itemInstance.communications.push(item);
    },

    UPDATE_COMMUNICATION_ITEM: (state, {index, item}) => {
        state.itemInstance.communications[index] = item;
    },

    REMOVE_COMMUNICATION_ITEM: (state, index) => {
        state.itemInstance.communications.splice(index, 1);
    },

    ADD_VARIABLE_PAIR: (state, pair) => {
        state.itemInstance.variables.push(pair);
    },

    SET_VARIABLE_PROP: (state, {index, prop, value}) => {
        state.itemInstance.variables[index][prop] = value;
    },

    DELETE_VARIABLE_PAIR: (state, index) => {
        state.itemInstance.variables.splice(index, 1);
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
    modules: {communications}
};
