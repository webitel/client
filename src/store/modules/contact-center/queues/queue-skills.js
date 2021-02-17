import {
    getQueueSkillsList, getQueueSkill, addQueueSkill,
    updateQueueSkill, deleteQueueSkill,
} from '../../../../api/contact-center/queues/queueSkills';
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
        return getQueueSkillsList(context.state.parentId, context.state.page, context.state.size, context.state.search);
    },

    GET_ITEM: (context) => {
        return getQueueSkill(context.state.parentId, context.state.itemId);
    },

    POST_ITEM: (context) => {
        return addQueueSkill(context.state.parentId, context.state.itemInstance);
    },

    UPD_ITEM: (context) => {
        return updateQueueSkill(context.state.parentId, context.state.itemId, context.state.itemInstance);
    },

    DELETE_ITEM: (context, id) => {
        return deleteQueueSkill(context.state.parentId, id);
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
