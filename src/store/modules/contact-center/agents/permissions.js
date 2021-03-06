import {getAgentPermissions, patchAgentPermissions} from "../../../../api/contact-center/agents/agents";
import {DefaultPermissionsModule} from "../../defaults/DefaultPermissionsModule";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 1,
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
        return await getAgentPermissions(context.state.parentId, context.state.page, context.state.size, context.state.search);
    },

    PATCH_PERMISSIONS: async (context, item) => {
        await patchAgentPermissions(context.state.parentId, item);
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
