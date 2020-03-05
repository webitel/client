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
            name: 'dialplan name',
            schema: {},
            pattern: '{*}?',
            description: 'description',
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
        // await context.commit('SWAP_ROWS', {fromId, toId});
        try {
            await moveDialplan(fromId, toId);
        } catch {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    ...defaultModule.actions,
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
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
