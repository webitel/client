import proxy from "../../../../utils/editProxy";
import {
    getResDisplayList, addResDisplay,
    updateResDisplay, deleteResDisplay, getResDisplay
} from "../../../../api/contact-center/resources/resourceDisplay";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultItemState = () => ({
    itemId: 0,
    itemInstance: {
        display: ''
    },
});


const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    ...defaultModule.actions,

    GET_LIST: (context) => {
        return getResDisplayList(context.state.parentId, context.state.page, context.state.size, context.state.search);
    },

    GET_ITEM: (context) => {
        return getResDisplay(context.state.parentId, context.state.itemId);
    },

    POST_ITEM: (context) => {
        return addResDisplay(context.state.parentId, context.state.itemInstance);
    },

    UPD_ITEM: (context) => {
      return updateResDisplay(context.state.parentId, context.state.itemId, context.state.itemInstance);
    },

    DELETE_ITEM: (context, id) => {
        return deleteResDisplay(context.state.parentId, id);
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
