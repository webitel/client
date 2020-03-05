import proxy from "../../../../utils/editProxy";
import {
    getResDisplayList, addResDisplay,
    updateResDisplay, deleteResDisplay, getResDisplay
} from "../../../../api/contact-center/resources/resourceDisplay";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultState = () => {
    return {
        itemId: 0,
        dataList: [],
        size: '10',
        search: '',
        page: 0,
        isNextPage: true,
        itemInstance: {display: '2'},
    }
};


const defaultModule = new DefaultNestedModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getResDisplayList(state.parentId, state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getResDisplay(state.parentId, state.itemId);
    },

    POST_ITEM: async () => {
        return await addResDisplay(state.parentId, state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateResDisplay(state.parentId, state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteResDisplay(state.parentId, id);
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
