import proxy from "../../../../utils/editProxy";
import {
    getResDisplayList, addResDisplay,
    updateResDisplay, deleteResDisplay, getResDisplay
} from "../../../../api/contact-center/resources/resourceDisplay";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultItemState = () => ({
    itemId: 0,
    itemInstance: {
        display: '2'
    },
});


const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    ...defaultModule.actions,

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
