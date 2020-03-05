import {getAgentHistory} from "../../../../api/contact-center/agents/agents";
import {DefaultHistoryModule} from "../../defaults/DefaultHistoryModule";

const defaultState = () => {
    return {
        date: Date.now(),
    };
};

const defaultModule = new DefaultHistoryModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_HISTORY_LIST: async (context) => {
        return await getAgentHistory(context.state.itemId, context.state.date, context.state.page);
    },

    ...defaultModule.actions,
};

const mutations = {
    ...defaultModule.mutations,
};

export default {
    state,
    getters,
    actions,
    mutations,
};