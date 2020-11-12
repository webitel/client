import communications from './queue-member-communications';
import {
    addMember, deleteMember, deleteMembers,
    getMember, getMembersList, updateMember
} from "../../../../api/contact-center/queues/queueMembers";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultState = () => {
    return {
        dataList:[],
        destinationId: 0,
        itemId: 0,
        itemInstance: {
            name: '',
            priority: '0',
            expireAt: 0,
            skill: {},
            bucket: {},
            timezone: {},
            communications: [],
            variables: [],
        },
    };
};

const defaultModule = new DefaultNestedModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {
    GET_ITEM_DESTINATIONS: (state) => {
        const item = state.dataList.filter(item => item.id === state.destinationId)[0];
        return item.communications;
    },
};

const actions = {

    ...defaultModule.actions,

    ADD_ITEM: async (context) => {
        if (!context.state.itemId) {
            const id = await context.dispatch('POST_ITEM');
            context.dispatch('SET_ITEM_ID', id);
            await context.dispatch('LOAD_ITEM');
        }
    },

    UPDATE_ITEM: async (context) => {
        if (context.state.itemInstance._dirty) {
            await context.dispatch('UPD_ITEM');
            await context.dispatch('LOAD_ITEM');
        }
    },

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

    DELETE_ITEMS: async (context, ids) => {
        await deleteMembers(state.parentId, ids);
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

    REMOVE_ITEMS: async (context, {indexs, ids}) => {
        try {
            await context.dispatch('DELETE_ITEMS', ids);
        } catch {
        }
        context.commit('REMOVE_ITEMS', indexs);
    },

};

const mutations = {

    ...defaultModule.mutations,

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

    REMOVE_ITEMS: (state, indexs) => {
        for(const item of indexs) {
            state.dataList.splice(item, 1);
        }
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
