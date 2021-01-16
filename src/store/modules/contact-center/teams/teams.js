import proxy from '../../../../utils/editProxy';
import supervisors from './team-supervisors';
import agents from './team-agents';
import skills from './team-skills';
import permissions from './permissions';
import {
    addTeam, deleteTeam,
    getTeam, getTeamsList, updateTeam,
} from "../../../../api/contact-center/teams/teams";
import { DefaultModule } from "../../defaults/DefaultModule";

const defaultState = () => ({
    itemId: 0,
    itemInstance: {
        name: '',
        description: '',
        strategy: {},
        maxNoAnswer: 3,
        wrapUpTime: 15,
        noAnswerDelayTime: 30,
        callTimeout: 60,
        postProcessing: false,
    },
});

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: (context) => {
        return getTeamsList(context.state.page, context.state.size, context.state.search);
    },

    GET_ITEM: (context) => {
        return getTeam(context.state.itemId);
    },

    POST_ITEM: (context) => {
        return addTeam(context.state.itemInstance);
    },

    UPD_ITEM: (context) => {
        return updateTeam(context.state.itemId, context.state.itemInstance);
    },

    DELETE_ITEM: (context, id) => {
        return deleteTeam(id);
    },

    RESET_ITEM_STATE: (context) => {
        context.commit('RESET_ITEM_STATE');
        context.dispatch('ccenter/teams/supervisors/RESET_STATE', {}, { root: true });
        context.dispatch('ccenter/teams/agents/RESET_STATE', {}, { root: true });
        context.dispatch('ccenter/teams/skills/RESET_STATE', {}, { root: true });
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
    modules: { supervisors, agents, skills, permissions },
};
