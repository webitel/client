import { DefaultNestedModule } from "../../defaults/DefaultNestedModule";
import { getQueueCallLogList } from "../../../../api/contact-center/queues/queueLog";

const defaultState = () => ({
    dataList: [],
    size: '10',
    page: 1,
    sortOrder: '+joined_at',
    isNextPage: true,
});

const defaultModule = new DefaultNestedModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: (context) => {
        return getQueueCallLogList(context.state.parentId, context.state.page, context.state.size, context.state.sortOrder);
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

    RESET_ITEM_STATE: (state) => {
        Object.assign(defaultState(), state);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
