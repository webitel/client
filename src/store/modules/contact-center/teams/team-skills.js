import {
    getTeamSkillsList, getTeamSkill, addTeamSkill,
    updateTeamSkill, deleteTeamSkill,
} from '../../../../api/contact-center/teams/teamSkills';
import { DefaultNestedModule } from '../../defaults/DefaultNestedModule';

const defaultItemState = () => ({
    itemId: 0,
    itemInstance: {
        skill: {},
        lvl: 0,
        minCapacity: 0,
        maxCapacity: 10,
        buckets: [],
    },
});

const defaultNestedModule = new DefaultNestedModule(null, defaultItemState);

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
    GET_LIST: (context) => {
        return getTeamSkillsList(context.state.parentId, context.state.page, context.state.size, context.state.search);
    },

    GET_ITEM: (context) => {
        return getTeamSkill(context.state.parentId, context.state.itemId);
    },

    POST_ITEM: (context) => {
        return addTeamSkill(context.state.parentId, context.state.itemInstance);
    },

    UPD_ITEM: (context) => {
        return updateTeamSkill(context.state.parentId, context.state.itemId, context.state.itemInstance);
    },

    DELETE_ITEM: (context, id) => {
        return deleteTeamSkill(context.state.parentId, id);
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
