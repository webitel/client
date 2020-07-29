import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";
import {getTokens} from "../../../../api/directory/users/users";

const defaultState = () => {
    return {
        dataList: [],
        itemId: 0,
        itemInstance: {
            token: '',
            usage: '',
        }
    }
};


const defaultModule = new DefaultNestedModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getTokens(state.parentId);
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