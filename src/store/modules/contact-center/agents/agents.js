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
            progressiveCount: 1,
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

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
        context.dispatch('ccenter/agents/skills/RESET_ITEM_STATE', {}, {root: true});
    },

    ...defaultModule.actions,
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
