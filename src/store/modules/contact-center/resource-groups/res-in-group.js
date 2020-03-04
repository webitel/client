import proxy from "../../../../utils/editProxy";
import {
    addResInGroup,
    deleteResInGroup,
    getResInGroup, getResInGroupList,
    updateResInGroup
} from "../../../../api/contact-center/resourceGroups/resInGroup";
import {DefaultNestedModule} from "../../defaults/DefaultNestedModule";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 0,
        isNextPage: true,
        itemId: 0,
        itemInstance: {
            resource: {}
            },
    }
};


const defaultModule = new DefaultNestedModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getResInGroupList(state.parentId, state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getResInGroup(state.parentId, state.itemId);
    },

    POST_ITEM: async () => {
        return await addResInGroup(state.parentId, state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateResInGroup(state.parentId, state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteResInGroup(state.parentId, id);
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
