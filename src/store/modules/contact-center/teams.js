import proxy from '../../../utils/editProxy';
import {
    addTeam, addTeamAgent, addTeamSkill, addTeamSupervisor,
    deleteTeam, deleteTeamAgent, deleteTeamSkill, deleteTeamSupervisor,
    getTeam, getTeamAgent, getTeamAgentsList, getTeamSkill, getTeamSkillsList, getTeamsList, getTeamSupervisor,
    getTeamSupervisorsList, updateTeam, updateTeamAgent, updateTeamSkill,
    updateTeamSupervisor
} from "../../../api/contact-center/teams";
import {getDeviceHistory} from "../../../api/directory/devices";

const defaultState = () => {
    return {
        itemId: 0,
        historyDate: Date.now(),
        itemInstance: {
            name: 'name',
            description: 'descr',
            strategy: 'strategy',
            maxNoAnswer: 10,
            wrapUpTime: 10,
            rejectDelayTime: 10,
            busyDelayTime: 10,
            noAnswerDelayTime: 10,
            callTimeout: 10,
        },

        supervisorDataList: [],
        supervisorSize: '10',
        supervisorSearch: '',
        supervisorItemId: 0,
        supervisorItemInstance: {
            agent: '',
        },

        agentDataList: [],
        agentSize: '10',
        agentSearch: '',
        agentItemId: 0,
        agentItemInstance: {
            agent: '',
            lvl: 12,
            bucket: '',
        },

        skillDataList: [],
        skillSize: '10',
        skillSearch: '',
        skillItemId: 0,
        skillItemInstance: {
            skill: '',
            lvl: 0,
            minCapacity: 0,
            maxCapacity: 10,
            bucket: '',
        },
    };
};

const state = {
    dataList: [],
    size: '10',
    search: '',
    historyDataList: [],
    historySize: '10',
    historySearch: '',
    ...defaultState()
};

const getters = {};

const actions = {
    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await getTeamsList(state.size, state.search);
        context.commit('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    LOAD_HISTORY_DATA_LIST: async (context) => {
        const response = await getDeviceHistory(state.itemId, state.historyDate);
        context.commit('LOAD_HISTORY_DATA_LIST', response);
    },

    SET_HISTORY_SIZE: (context, size) => {
        context.commit('SET_HISTORY_SIZE', size);
    },

    SET_HISTORY_SEARCH: (context, search) => {
        context.commit('SET_HISTORY_SEARCH', search);
    },

    SET_HISTORY_DATE: (context, date) => {
        context.commit('SET_HISTORY_DATE', date)
    },

    LOAD_ITEM: async (context) => {
        if (state.itemId) {
            const item = await getTeam(state.itemId);
            context.commit('SET_ITEM', proxy(item));
        }
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_ITEM: async (context) => {
        if(!state.itemId) {
            const id = await addTeam(state.itemInstance);
            context.dispatch('SET_ITEM_ID', id);
            context.dispatch('LOAD_ITEM');
        }
    },

    UPDATE_ITEM: async (context) => {
        if (state.itemInstance._dirty) {
            await updateTeam(state.itemId, state.itemInstance);
            context.dispatch('LOAD_ITEM');
        }
    },

    REMOVE_ITEM: async (context, index) => {
        const id = state.dataList[index].id;
        context.commit('REMOVE_ITEM', index);
        try {
            await deleteTeam(id);
        } catch {
        }
    },

    SET_SUPERVISOR_ITEM_ID: (context, id) => {
        context.commit('SET_SUPERVISOR_ITEM_ID', id);
    },

    LOAD_SUPERVISOR_DATA_LIST: async (context) => {
        if (state.itemId) {
            const response = await getTeamSupervisorsList(state.itemId, state.supervisorSize, state.supervisorSearch);
            context.commit('SET_SUPERVISOR_DATA_LIST', response);
        } else {
            context.commit('SET_SUPERVISOR_DATA_LIST', []);
        }
        context.dispatch('SET_SUPERVISOR_ITEM_ID', 0);
    },

    SET_SUPERVISOR_SIZE: (context, size) => {
        context.commit('SET_SUPERVISOR_SIZE', size);
    },

    SET_SUPERVISOR_SEARCH: (context, search) => {
        context.commit('SET_SUPERVISOR_SEARCH', search);
    },

    LOAD_SUPERVISOR_ITEM: async (context) => {
        if (state.supervisorItemId) {
            const item = await getTeamSupervisor(state.itemId, state.supervisorItemId);
            context.commit('SET_SUPERVISOR_ITEM', proxy(item));
        } else {
            context.commit('SET_SUPERVISOR_ITEM', {agent: ''});
        }
    },

    SET_SUPERVISOR_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_SUPERVISOR_ITEM_PROPERTY', payload);
    },

    ADD_SUPERVISOR_ITEM: async (context) => {
        await addTeamSupervisor(state.itemId, state.supervisorItemInstance);
        context.dispatch('LOAD_SUPERVISOR_DATA_LIST', state.itemId);
    },

    UPDATE_SUPERVISOR_ITEM: async (context) => {
        await updateTeamSupervisor(state.itemId, state.supervisorItemId, state.supervisorItemInstance);
        context.dispatch('LOAD_SUPERVISOR_DATA_LIST', state.itemId);
    },

    REMOVE_SUPERVISOR_ITEM: async (context, index) => {
        const id = state.supervisorDataList[index].id;
        context.commit('REMOVE_SUPERVISOR_ITEM', index);
        try {
            await deleteTeamSupervisor(state.itemId, id);
        } catch {}
    },

    SET_AGENT_ITEM_ID: (context, id) => {
        context.commit('SET_AGENT_ITEM_ID', id);
    },

    LOAD_AGENT_DATA_LIST: async (context) => {
        if (state.itemId) {
            const response = await getTeamAgentsList(state.itemId, state.agentSize, state.agentSearch);
            context.commit('SET_AGENT_DATA_LIST', response);
        } else {
            context.commit('SET_AGENT_DATA_LIST', []);
        }
        context.dispatch('SET_AGENT_ITEM_ID', 0);
    },

    SET_AGENT_SIZE: (context, size) => {
        context.commit('SET_AGENT_SIZE', size);
    },

    SET_AGENT_SEARCH: (context, search) => {
        context.commit('SET_AGENT_SEARCH', search);
    },

    LOAD_AGENT_ITEM: async (context) => {
        if (state.agentItemId) {
            const item = await getTeamAgent(state.itemId, state.agentItemId);
            context.commit('SET_AGENT_ITEM', proxy(item));
        } else {
            context.commit('SET_AGENT_ITEM', {agent: '', lvl: '', bucket: ''});
        }
    },

    SET_AGENT_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_AGENT_ITEM_PROPERTY', payload);
    },

    ADD_AGENT_ITEM: async (context) => {
        await addTeamAgent(state.itemId, state.agentItemInstance);
        context.dispatch('LOAD_AGENT_DATA_LIST', state.itemId);
    },

    UPDATE_AGENT_ITEM: async (context) => {
        await updateTeamAgent(state.itemId, state.agentItemId, state.agentItemInstance);
        context.dispatch('LOAD_AGENT_DATA_LIST', state.itemId);
    },

    REMOVE_AGENT_ITEM: async (context, index) => {
        const id = state.agentDataList[index].id;
        context.commit('REMOVE_AGENT_ITEM', index);
        try {
            await deleteTeamAgent(state.itemId, id);
        } catch {}
    },

    SET_SKILL_ITEM_ID: (context, id) => {
        context.commit('SET_SKILL_ITEM_ID', id);
    },

    LOAD_SKILL_DATA_LIST: async (context) => {
        if (state.itemId) {
            const response = await getTeamSkillsList(state.itemId, state.agentSize, state.agentSearch);
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
            const item = await getTeamSkill(state.itemId, state.skillItemId);
            context.commit('SET_SKILL_ITEM', proxy(item));
        } else {
            context.commit('SET_SKILL_ITEM', {skill: '', lvl: '', minCapacity: '', maxCapacity: '', bucket: ''});
        }
    },

    SET_SKILL_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_SKILL_ITEM_PROPERTY', payload);
    },

    ADD_SKILL_ITEM: async (context) => {
        await addTeamSkill(state.itemId, state.skillItemInstance);
        context.dispatch('LOAD_SKILL_DATA_LIST', state.itemId);
    },

    UPDATE_SKILL_ITEM: async (context) => {
        await updateTeamSkill(state.itemId, state.skillItemId, state.skillItemInstance);
        context.dispatch('LOAD_SKILL_DATA_LIST', state.itemId);
    },

    REMOVE_SKILL_ITEM: async (context, index) => {
        const id = state.skillDataList[index].id;
        context.commit('REMOVE_SKILL_ITEM', index);
        try {
            await deleteTeamSkill(state.itemId, id);
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

    LOAD_HISTORY_DATA_LIST: (state, list) => {
        state.historyDataList = list;
    },

    SET_HISTORY_SIZE: (state, size) => {
        state.historySize = size;
    },

    SET_HISTORY_SEARCH: (state, search) => {
        state.historySearch = search;
    },

    SET_HISTORY_DATE: (state, date) => {
        state.historyDate = date;
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

    SET_SUPERVISOR_ITEM_ID: (state, id) => {
        state.supervisorItemId = id;
    },

    SET_SUPERVISOR_DATA_LIST: (state, list) => {
        state.supervisorDataList = list;
    },

    SET_SUPERVISOR_SIZE: (state, size) => {
        state.supervisorSize = size;
    },

    SET_SUPERVISOR_SEARCH: (state, search) => {
        state.supervisorSearch = search;
    },

    SET_SUPERVISOR_ITEM_PROPERTY: (state, {prop, value}) => {
        state.supervisorItemInstance[prop] = value;
    },

    SET_SUPERVISOR_ITEM: (state, item) => {
        state.supervisorItemInstance = item;
    },

    REMOVE_SUPERVISOR_ITEM: (state, index) => {
        state.supervisorDataList.splice(index, 1);
    },

    SET_AGENT_ITEM_ID: (state, id) => {
        state.agentItemId = id;
    },

    SET_AGENT_DATA_LIST: (state, list) => {
        state.agentDataList = list;
    },

    SET_AGENT_SIZE: (state, size) => {
        state.agentSize = size;
    },

    SET_AGENT_SEARCH: (state, search) => {
        state.agentSearch = search;
    },

    SET_AGENT_ITEM_PROPERTY: (state, {prop, value}) => {
        state.agentItemInstance[prop] = value;
    },

    SET_AGENT_ITEM: (state, item) => {
        state.agentItemInstance = item;
    },

    REMOVE_AGENT_ITEM: (state, index) => {
        state.agentDataList.splice(index, 1);
    },

    SET_SKILL_ITEM_ID: (state, id) => {
        state.skillItemId = id;
    },

    SET_SKILL_DATA_LIST: (state, list) => {
        state.skillDataList = list;
    },

    SET_SKILL_SIZE: (state, size) => {
        state.skillSize = size;
    },

    SET_SKILL_SEARCH: (state, search) => {
        state.skillSearch = search;
    },

    SET_SKILL_ITEM_PROPERTY: (state, {prop, value}) => {
        state.skillItemInstance[prop] = value;
    },

    SET_SKILL_ITEM: (state, item) => {
        state.skillItemInstance = item;
    },

    REMOVE_SKILL_ITEM: (state, index) => {
        state.skillDataList.splice(index, 1);
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
