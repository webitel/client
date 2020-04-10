import {
    getTeamSkillsList, getTeamSkill, addTeamSkill,
    updateTeamSkill, deleteTeamSkill
} from "../../../../api/contact-center/teams/teamSkills";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultState = () => {
    return {
        itemId: 0,
        dataList: [],
        size: '10',
        search: '',
        page: 0,
        isNextPage: true,
        itemInstance: {
            skill: {},
            lvl: 0,
            minCapacity: 0,
            maxCapacity: 10,
            buckets: [],
        },
    };
};

const defaultNestedModule = new DefaultNestedModule(defaultState);

const state = {
    ...defaultNestedModule.state,
};

const getters = {
    GET_ITEM_BUCKETS: (state) => (id) => {
        const item = state.dataList.filter(item => item.id === id)[0];
        return item.buckets;
    },
};

const actions = {
    GET_LIST: async () => {
        return await getTeamSkillsList(state.parentId, state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getTeamSkill(state.parentId, state.itemId);
    },

    POST_ITEM: async () => {
        return await addTeamSkill(state.parentId, state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateTeamSkill(state.parentId, state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteTeamSkill(state.parentId, id);
    },

    ...defaultNestedModule.actions,
};

const mutations = {
    ...defaultNestedModule.mutations,

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
