import proxy from '../../../../utils/editProxy';
import store from '../../../store';

const defaultState = () => {
    return {
        itemId: null,
        itemInstance: {
            destination: '555 3535',
            display: '5656',
            priority: 0,
            type: {},
            resource: {},
            description: '',
        },
    };
};

const state = {
    dataList: [],
    ...defaultState()
};

const getters = {};

const actions = {
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

    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await context.dispatch('GET_LIST');
        context.dispatch('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
    },

    LOAD_ITEM: async (context) => {
        if (typeof state.itemId === 'number') {
            const item = await context.dispatch('GET_ITEM');
            context.commit('SET_ITEM', proxy(item));
        }
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_ITEM: async (context) => {
        if (typeof state.itemId !== 'number') {
            await context.dispatch('POST_ITEM');
        }
        context.dispatch('LOAD_DATA_LIST');
    },

    UPDATE_ITEM: async (context) => {
        if (state.itemInstance._dirty) {
            await context.dispatch('UPD_ITEM');
        }
        context.dispatch('LOAD_DATA_LIST');
    },

    REMOVE_ITEM: async (context, index) => {
        context.commit('REMOVE_ITEM', index);
        try {
            await context.dispatch('DELETE_ITEM', index);
        } catch {
        }
        context.dispatch('LOAD_DATA_LIST');
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
