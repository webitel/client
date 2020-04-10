import proxy from '../../../../utils/editProxy';
import supervisors from './team-supervisors';
import agents from './team-agents';
import skills from './team-skills';
import permissions from './permissions';
import {
    addTeam, deleteTeam,
    getTeam,  getTeamsList, updateTeam,
} from "../../../../api/contact-center/teams/teams";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: 'name',
            description: 'descr',
            strategy: {name: 'Random', value: 'random'},
            maxNoAnswer: 10,
            wrapUpTime: 10,
            rejectDelayTime: 10,
            busyDelayTime: 10,
            noAnswerDelayTime: 10,
            callTimeout: 10,
            post_processing: false,
            post_processing_timeout: 20
        },
    };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getTeamsList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getTeam(state.itemId);
    },

    POST_ITEM: async () => {
        return await addTeam(state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateTeam(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteTeam(id);
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
        context.dispatch('ccenter/teams/supervisors/RESET_ITEM_STATE', {}, {root: true});
        context.dispatch('ccenter/teams/agents/RESET_ITEM_STATE', {}, {root: true});
        context.dispatch('ccenter/teams/skills/RESET_ITEM_STATE', {}, {root: true});
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
    modules: {supervisors, agents, skills, permissions},
};
