import store from '../../../store';
import {DefaultNestedListModule} from "../../defaults/DefaultNestedListModule";

const defaultState = () => {
    return {
        itemInstance: {
            destination: '',
            display: '',
            priority: 0,
            type: {},
            resource: {},
            description: '',
        },
    };
};

const defaultModule = new DefaultNestedListModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    ...defaultModule.actions,

    GET_LIST: async () => {
        const defaultObject = {
            _isSelected: false,
            priority: 0,
        };

        return store.state.ccenter.queues.members.itemInstance.communications.map(item => {
            return {
                ...defaultObject,
                ...item,
            }
        });
    },

    GET_ITEM: async () => {
        return {...store.state.ccenter.queues.members.itemInstance.communications[state.itemId], _dirty: false};
    },

    POST_ITEM: async (context) => {
        await context.dispatch('ccenter/queues/members/ADD_COMMUNICATION_ITEM',
            state.itemInstance, {root: true});
    },

    UPD_ITEM: async (context) => {
        await context.dispatch('ccenter/queues/members/UPDATE_COMMUNICATION_ITEM',
            {index: state.itemId, item: state.itemInstance}, {root: true});
    },

    DELETE_ITEM: async (context, id) => {
        await context.dispatch('ccenter/queues/members/REMOVE_COMMUNICATION_ITEM',
            id, {root: true});
    },

};

const mutations = {
    ...defaultModule.mutations,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
