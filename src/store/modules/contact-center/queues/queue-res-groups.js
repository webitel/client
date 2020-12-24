import proxy from '../../../../utils/editProxy';
import {
    addQueueResGroup, deleteQueueResGroup,
    getQueueResGroup,
    getQueueResGroupList, updateQueueResGroup
} from "../../../../api/contact-center/queues/queueResGroups";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 1,
        isNextPage: true,
        itemId: 0,
        itemInstance: {
            resourceGroup: {},
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
        return await getQueueResGroupList(state.parentId, state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getQueueResGroup(state.parentId, state.itemId);
    },

    POST_ITEM: async () => {
        return await addQueueResGroup(state.parentId, state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateQueueResGroup(state.parentId, state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteQueueResGroup(state.parentId, id);
        await context.dispatch('LOAD_DATA_LIST');
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
