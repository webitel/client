import {
    getTeamAgentsList, getTeamAgent, addTeamAgent,
    updateTeamAgent, deleteTeamAgent
} from "../../../../api/contact-center/teams/teamAgents";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 0,
        isNextPage: true,
        itemId: 0,
        bucketId: 0,
        itemInstance: {
            agent: {},
            lvl: 12,
            buckets: [],
        },
    };
};

const defaultNestedModule = new DefaultNestedModule(defaultState);

const state = {
    ...defaultNestedModule.state,
};

const getters = {
    GET_ITEM_BUCKETS: (state) => {
        const item = state.dataList.filter(item => item.id === state.bucketId)[0];
        return item.buckets;
    },
};

const actions = {
    GET_LIST: async () => {
        return await getTeamAgentsList(state.parentId, state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getTeamAgent(state.parentId, state.itemId);
    },

    POST_ITEM: async () => {
        return await addTeamAgent(state.parentId, state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateTeamAgent(state.parentId, state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteTeamAgent(state.parentId, id);
    },

    SET_BUCKETS_ID: async (context, id) => {
        context.commit('SET_BUCKETS_ID', id);
    },

    ...defaultNestedModule.actions,
};

const mutations = {
    ...defaultNestedModule.mutations,

    SET_BUCKETS_ID: (state, id) => {
        state.bucketId = id;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
