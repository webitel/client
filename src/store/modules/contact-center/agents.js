import proxy from '../../../utils/editProxy';
import {
    addAgent, addAgentSkill,
    deleteAgent, deleteAgentSkill,
    getAgent, getAgentSkill, getAgentSkillsList,
    getAgentsList,
    updateAgent, updateAgentSkill
} from "../../../api/contact-center/agents";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            user: '',
            description: '',
        },
        skillDataList: [],
        skillSize: '10',
        skillSearch: '',
        skillItemId: 0,
        skillItemInstance: {
            skill: '',
            capacity: 10,
            id: 0,
        }
    };
};

const state = {
    dataList: [],
    size: '10',
    search: '',
    ...defaultState()
};

const getters = {};

const actions = {
    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await getAgentsList(state.size, state.search);
        context.commit('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    LOAD_ITEM: async (context) => {
        if (state.itemId) {
            const item = await getAgent(state.itemId);
            context.commit('SET_ITEM', proxy(item));
        }
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_ITEM: async (context) => {
        if(!state.itemId) {
            const id = await addAgent(state.itemInstance);
            context.dispatch('SET_ITEM_ID', id);
            context.dispatch('LOAD_ITEM');
        }
    },

    UPDATE_ITEM: async (context) => {
        if (state.itemInstance._dirty) {
            await updateAgent(state.itemId, state.itemInstance);
            context.dispatch('LOAD_ITEM');
        }
    },

    REMOVE_ITEM: async (context, index) => {
        const id = state.dataList[index].id;
        context.commit('REMOVE_ITEM', index);
        try {
            await deleteAgent(id);
        } catch {
        }
    },

    SET_SKILL_ITEM_ID: (context, id) => {
        context.commit('SET_SKILL_ITEM_ID', id);
    },

    LOAD_SKILL_DATA_LIST: async (context) => {
        if (state.itemId) {
            const response = await getAgentSkillsList(state.itemId, state.skillSize, state.skillSearch);
            context.commit('SET_SKILL_DATA_LIST', response);
        } else {
            context.commit('SET_SKILL_DATA_LIST', []);
        }
        context.dispatch('SET_SKILL_ITEM_ID', 0);
    },

    SET_SKILL_SIZE: (context, size) => {
        context.commit('SET_SKILL_SIZE', size);
    },

    SET_SKILL_SEARCH: (context, search) => {
        context.commit('SET_SKILL_SEARCH', search);
    },

    LOAD_SKILL_ITEM: async (context) => {
        if (state.skillItemId) {
            const item = await getAgentSkill(state.itemId, state.skillItemId);
            context.commit('SET_SKILL_ITEM', proxy(item));
        } else {
            context.commit('SET_SKILL_ITEM', {skill: '', capacity: 10});
        }
    },

    SET_SKILL_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_SKILL_ITEM_PROPERTY', payload);
    },

    ADD_SKILL_ITEM: async (context) => {
        await addAgentSkill(state.itemId, state.skillItemInstance);
        context.dispatch('LOAD_SKILL_DATA_LIST', state.itemId);
    },

    UPDATE_SKILL_ITEM: async (context) => {
        await updateAgentSkill(state.itemId, state.skillItemId, state.skillItemInstance);
        context.dispatch('LOAD_SKILL_DATA_LIST', state.itemId);
    },

    REMOVE_SKILL_ITEM: async (context, index) => {
        const id = state.skillDataList[index].id;
        context.commit('REMOVE_SKILL_ITEM', index);
        try {
            await deleteAgentSkill(state.itemId, id);
        } catch {}
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

    SET_SIZE: (state, size) => {
        state.size = size;
    },

    SET_SEARCH: (state, search) => {
        state.search = search;
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

    SET_SKILL_DATA_LIST: (state, list) => {
        state.skillDataList = list;
    },

    SET_SKILL_SIZE: (context, size) => {
        state.skillSize = size;
    },

    SET_SKILL_SEARCH: (context, search) => {
        state.skillSearch = search;
    },

    SET_SKILL_ITEM_ID: (state, id) => {
        state.skillItemId = id;
    },

    SET_SKILL_ITEM: (state, item) => {
        state.skillItemInstance = item;
    },

    SET_SKILL_ITEM_PROPERTY: (state, {prop, value}) => {
        state.skillItemInstance[prop] = value;
    },

    REMOVE_SKILL_ITEM: (state, index) => {
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
