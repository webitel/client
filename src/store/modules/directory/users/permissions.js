import {getUserPermissions, patchUserPermissions} from "../../../../api/directory/users/users";
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
    ADD_ITEM_ROLE: async (context, role) => {
        const item = [{
            grantee: role.id,
            access: 'r'
        }];
        try {
            await patchUserPermissions(state.parentId, item);
        } catch {}
        finally {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    LOAD_PERMISSIONS_LIST: async (context) => {
        return await getUserPermissions(context.state.parentId, context.state.page, context.state.size, context.state.search);
    },

    PATCH_PERMISSIONS: async (context, item) => {
        await patchUserPermissions(context.state.parentId, item);
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
