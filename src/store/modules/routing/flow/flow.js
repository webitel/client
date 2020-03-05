import proxy from '../../../../utils/editProxy';
import {addFlow, deleteFlow, getFlow, getFlowList, updateFlow} from "../../../../api/routing/flow/flow";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: 'test-schema-name',
            schema: '[]'
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
        return await getFlowList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getFlow(state.itemId);
    },

    POST_ITEM: async () => {
        return await addFlow(state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateFlow(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteFlow(id);
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
