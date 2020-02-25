import skills from './agent-skills';
import history from './history';
import teams from './agent-teams';
import queues from './agent-queues';
import permissions from './permissions';
import {
    addAgent, deleteAgent,
    getAgent, getAgentsList, updateAgent,
} from "../../../../api/contact-center/agents/agents";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            user: {},
            description: '',
        },
    };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async (context) => {
        return await getAgentsList(context.state.page, context.state.size, context.state.search);
    },

    GET_ITEM: async (context) => {
        return await getAgent(context.state.itemId);
    },

    POST_ITEM: async (context) => {
        return await addAgent(context.state.itemInstance);
    },

    UPD_ITEM: async (context) => {
        await updateAgent(context.state.itemId, context.state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteAgent(id);
    },

    ...defaultModule.actions,

    LOAD_DATA_LIST: async (context) => {
        const response = await context.dispatch('GET_LIST');
        context.dispatch('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response.list);
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
        context.dispatch('ccenter/agents/skills/RESET_ITEM_STATE', {}, {root: true});
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
    modules: {history, skills, teams, queues, permissions}
};
