import {
    getObjectList,
    getObjectPermissions,
    patchObjectPermissions,
    updateObject
} from "../../../api/permissions/objects";

const defaultState = () => {
    return {
        itemId: 0,
        itemPermissionsDataList: [],
    };
};

const state = {
    dataList: [],
    search: '',
    ...defaultState()
};

const getters = {};

const actions = {
    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await getObjectList(state.search);
        context.commit('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    TOGGLE_ITEM_PROPERTY: async (context, {prop, index}) => {
        await context.commit('TOGGLE_ITEM_PROPERTY', {prop, index});
        try {
            await updateObject(state.dataList[index].id, state.dataList[index]);
        } catch {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    LOAD_ITEM_PERMISSIONS_DATA_lIST: async (context) => {
        if (state.itemId) {
            const item = await getObjectPermissions(state.itemId);
            context.commit('SET_ITEM_PERMISSIONS_DATA_lIST', item);
        }
    },

    PATCH_ITEM_PERMISSIONS: async (context, {prop, index}) => {
        const readState = state.itemPermissionsDataList[index].access.r;
        await context.commit('PATCH_ITEM_PERMISSIONS', {prop, index});
        let item = [{
            grantee_id: state.itemPermissionsDataList[index].grantee.id,
            access: prop
        }];
        if (!readState) item[0].access += 'r';
        try {
            await patchObjectPermissions(state.itemId, item);
        } catch {
            context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_lIST');
        }
    },

    ADD_ITEM_ROLE: async (context, role) => {
        const item = [{
            grantee_id: role.id,
            access: 'r'
        }];
        try {
            await patchObjectPermissions(state.itemId, item);
            context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_lIST');
        } catch {
            context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_lIST');
        }
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },
};

const mutations = {
    SET_ITEM_ID: (state, id) => {
        state.itemId = id;
    },

    SET_DATA_LIST: (state, list) => {
        state.dataList = list;
    },

    SET_SEARCH: (state, search) => {
        state.search = search;
    },

    TOGGLE_ITEM_PROPERTY: (state, {prop, index}) => {
        state.dataList[index][prop] = !state.dataList[index][prop];
    },

    SET_ITEM_PERMISSIONS_DATA_lIST: (state, item) => {
        state.itemPermissionsDataList = item;
    },

    PATCH_ITEM_PERMISSIONS: (state, {prop, index}) => {
        // if 'read' checkbox switches to false, make all operations false
        if (prop === 'r' && state.itemPermissionsDataList[index].access.r) {
            Object.keys(state.itemPermissionsDataList[index].access).map(item => {
                state.itemPermissionsDataList[index].access[item] = false
            });
            return
            // else if another operation switches to true with unactive 'read', activate 'read' too
        } else if (!state.itemPermissionsDataList[index].access.r && prop !== 'r') {
            state.itemPermissionsDataList[index].access.r = true;
        }
        state.itemPermissionsDataList[index].access[prop] = !state.itemPermissionsDataList[index].access[prop];

    },

    RESET_ITEM_STATE: (state) => {
        Object.assign(state, defaultState());
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
