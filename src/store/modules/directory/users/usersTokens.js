import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";
import {getTokens, addTokens} from "../../../../api/directory/users/users";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 1,
        isNextPage: false,
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
        return await getTokens(state.parentId, state.page, state.size, state.search);
    },

    POST_ITEM: async () => {
        return await addTokens(state.parentId, state.itemInstance);
    },    

    ...defaultModule.actions,

    LOAD_DATA_LIST: async (context) => {
        if(context.state.parentId) {
            const response = await context.dispatch('GET_LIST');
            context.dispatch('RESET_ITEM_STATE');
            context.commit('SET_DATA_LIST', response.list);
            context.commit('SET_IS_NEXT', response.next);
        }
    },
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