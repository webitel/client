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
    
    ADD_TOKEN: async (context) => {
        try {
            let resp = await context.dispatch('POST_ITEM');            
            await context.dispatch('LOAD_DATA_LIST'); 
            context.commit('SET_TOKEN', resp.token);      
        }
        catch (err) {
            console.error(err);
        }
        
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

    SET_TOKEN: async (state, token) => {
        state.itemInstance.token = token;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};