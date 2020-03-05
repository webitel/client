import proxy from '../../../../utils/editProxy';
import {
    getTeamSupervisorsList, getTeamSupervisor,
    addTeamSupervisor, updateTeamSupervisor, deleteTeamSupervisor
} from "../../../../api/contact-center/teams/teamSupervisors";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 0,
        isNextPage: true,
        itemId: 0,
        itemInstance: {
            agent: {},
        },
    };
};

const defaultModule = new DefaultNestedModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getTeamSupervisorsList(state.parentId, state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getTeamSupervisor(state.parentId, state.itemId);
    },

    POST_ITEM: async () => {
        return await addTeamSupervisor(state.parentId, state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateTeamSupervisor(state.parentId, state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteTeamSupervisor(state.parentId, id);
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
};
