import {
    getResGroupPermissions,
    patchResGroupPermissions
} from "../../../../api/contact-center/resourceGroups/resourceGroups";
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
        return await getResGroupPermissions(context.state.parentId, context.state.page, context.state.size, context.state.search);
    },

    PATCH_PERMISSIONS: async (context, item) => {
        await patchResGroupPermissions(context.state.parentId, item);
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
