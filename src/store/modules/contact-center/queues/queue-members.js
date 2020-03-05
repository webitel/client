import communications from './queue-member-communications';
import {
    addMember, deleteMember,
    getMember, getMembersList, updateMember
} from "../../../../api/contact-center/queues/queueMembers";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultState = () => {
    return {
        destinationId: 0,
        itemId: 0,
        itemInstance: {
            name: 'memberr',
            priority: '0',
            expireAt: Date.now(),
            bucket: {},
            timezone: {},
            communications: [],
            // skills: [{text: 'skill1'}, {text: 'skill2'}],
            variables: [{key: 'Ke1y', value: 'Valu2e'}, {key: 'K3ey', value: 'Va4lue'},],
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

    ...defaultModule.actions,
};

const mutations = {

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

    ...defaultModule.mutations,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {communications}
};
