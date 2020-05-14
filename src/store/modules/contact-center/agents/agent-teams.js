import {getAgentTeamsList} from "../../../../api/contact-center/agents/agents";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 1,
        isNextPage: true,
    };
};
const defaultModule = new DefaultNestedModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async (context) => {
        return await getAgentTeamsList(context.state.parentId, context.state.page, context.state.size, context.state.search);
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