import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";
import {getQueueCallLogList} from "../../../../api/contact-center/queues/queueLog";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        page: 1,
        sortOrder: '+joined_at',
        isNextPage: true,
        itemId: 0,
        itemInstance: {
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
        return await getQueueCallLogList(state.parentId, state.page, state.size, state.sortOrder);
    },

    SET_SORT: async (context, value) => {
        context.commit('SET_SORT', value);
        await context.dispatch('LOAD_DATA_LIST');
    },

    ...defaultModule.actions,
};

const mutations = {
    SET_SORT: (state, value) => {
        state.sortOrder = value;
    },
    ...defaultModule.mutations,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
