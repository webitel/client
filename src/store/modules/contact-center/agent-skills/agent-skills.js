import {
    addSkill, deleteSkill,
    getSkill, getSkillsList, updateSkill
} from "../../../../api/contact-center/agentSkills/agentSkills";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: 'skill1',
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
        return await getSkillsList(context.state.page, context.state.size, context.state.search);
    },

    GET_ITEM: async (context) => {
        return await getSkill(context.state.itemId);
    },

    POST_ITEM: async (context) => {
        return await addSkill(context.state.itemInstance);
    },

    UPD_ITEM: async (context) => {
        await updateSkill(context.state.itemId, context.state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteSkill(id);
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
