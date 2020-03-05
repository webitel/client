import {getResPermissions, patchResPermissions} from "../../../../api/contact-center/resources/resources";
import {DefaultPermissionsModule} from "../../defaults/DefaultPermissionsModule";
import {getAgentPermissions, patchAgentPermissions} from "../../../../api/contact-center/agents/agents";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 0,
        isNextPage: true,
    }
};

const defaultModule = new DefaultPermissionsModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    LOAD_PERMISSIONS_LIST: async (context) => {
        return await getResPermissions(context.state.parentId, context.state.page, context.state.size, context.state.search);
    },

    PATCH_PERMISSIONS: async (context, item) => {
        await patchResPermissions(context.state.parentId, item);
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
