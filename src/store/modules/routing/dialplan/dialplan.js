import {
    addDialplan,
    deleteDialplan,
    getDialplan,
    getDialplanList, moveDialplan, patchDialplan,
    updateDialplan
} from "../../../../api/routing/dialplan/dialplan";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: '',
            schema: {},
            pattern: '',
            description: '',
        },
    }
};

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getDialplanList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getDialplan(state.itemId);
    },

    POST_ITEM: async () => {
        return await addDialplan(state.itemInstance);
    },

    PATCH_ITEM: async (context, {id, changes}) => {
        return await patchDialplan(id, changes);
    },

    UPD_ITEM: async () => {
        await updateDialplan(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteDialplan(id);
    },

    SWAP_ROWS: async (context, {fromId, toId}) => {
        // on-frontend swap commented
        // because sortable reinitialization triggers on each dataList change
        // but UI changes anyway
        //await context.commit('SWAP_ROWS', {fromId, toId});
        try {
            await moveDialplan(fromId, toId);
            await context.dispatch('LOAD_DATA_LIST');
        } catch {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    ...defaultModule.actions,

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },
};

const mutations = {

    SWAP_ROWS: (state, {fromId, toId}) => {
        const fromIndex = state.dataList.findIndex(item => item.id === fromId);
        const toIndex = state.dataList.findIndex(item => item.id === toId);
        const buffer =  state.dataList[fromIndex];
        state.dataList.splice(fromIndex, 1, state.dataList[toIndex]);
        state.dataList.splice(toIndex, 1, buffer);
    },

    ...defaultModule.mutations,

    RESET_ITEM_STATE: (state) => {
        state.dataList = [];
        Object.assign(state, defaultState());
        console.log(state.dataList);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
