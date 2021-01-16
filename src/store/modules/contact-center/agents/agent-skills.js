import {
    addAgentSkill, deleteAgentSkill,
    getAgentSkill, getAgentSkillsList,
    updateAgentSkill,
} from "../../../../api/contact-center/agents/agentSkills";
import { DefaultNestedModule } from "../../defaults/DefaultNestedModule";

const defaultItemState = () => ({
    itemId: 0,
    itemInstance: {
        skill: '',
        capacity: 10,
        id: 0,
    },
});
const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async (context) => {
        return await getAgentSkillsList(context.state.parentId, context.state.page, context.state.size, context.state.search);
    },

    GET_ITEM: async (context) => {
        return await getAgentSkill(context.state.parentId, context.state.itemId);
    },

    POST_ITEM: async (context) => {
        return await addAgentSkill(context.state.parentId, context.state.itemInstance);
    },

    UPD_ITEM: async (context) => {
        await updateAgentSkill(context.state.parentId, context.state.itemId, context.state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteAgentSkill(context.state.parentId, id);
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
