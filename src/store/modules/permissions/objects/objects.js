import {
    getObjectList,
    getObjectPermissions,
    patchObjectPermissions,
    patchObjectDefaultPermissions,
    updateObject,
    fetchObjclassDefaultList,
    toggleObjclassDefaultMode
} from "../../../../api/permissions/objects/objects";

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {},
        itemSize: '10',
        itemSearch: '',
        itemPage: 1,
        isItemNextPage: false,
        itemPermissionsDataList: [],
        itemPermissionsDefaultList: [],
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
        context.dispatch('RESET_ITEM_STATE');
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

    SET_ITEM_PERMISSIONS_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_ITEM_PERMISSIONS_SEARCH: (context, search) => {
        context.commit('SET_ITEM_PERMISSIONS_SEARCH', search);
    },

    NEXT_ITEM_PERMISSIONS_PAGE: (context) => {
        if(state.isNextPage) {
            context.commit('INCREMENT_ITEM_PERMISSIONS_PAGE');
            context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_LIST');
        }
    },

    PREV_ITEM_PERMISSIONS_PAGE: (context) => {
        if(state.page) {
            context.commit('DECREMENT_ITEM_PERMISSIONS_PAGE');
            context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_LIST');
        }
    },

    LOAD_ITEM_PERMISSIONS_DATA_lIST: async (context) => {
        if (state.itemId) {
            const item = await getObjectPermissions(state.itemId, state.itemPage, state.itemSize, state.itemSearch);
            context.commit('SET_ITEM_PERMISSIONS_DATA_lIST', item);
        }
    },

    PATCH_ITEM_PERMISSIONS: async (context, {prop, index}) => {
        const readState = state.itemPermissionsDataList[index].access.r;
        await context.commit('PATCH_ITEM_PERMISSIONS', {prop, index});
        
        let mode = '';
        switch (prop) {
        case 'x':
            mode = 'x';
            break;
        case 'r':
            mode = 'r';
            break;
        case 'w':
            mode = 'w';
            break;
        case 'd':
            mode = 'd';
            break;
        default:
            throw new Error(`Cound not identify access mode {{prop}}`);
        }
        let rule = {
            grantee: +(state.itemPermissionsDataList[index].grantee.id),
            grants: mode
        };
        if (!readState) rule.grants += 'r'; // ADD (!)
        try {
            await patchObjectPermissions(state.itemId, [rule]);
        } catch {
            context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_lIST');
        }
    },

    ADD_ITEM_ROLE: async (context, role) => {
        const item = [{
            grantee: +role.id,
            grants: 'r'
        }];
        try {
            await patchObjectPermissions(state.itemId, item);
            context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_lIST');
        } catch {
            context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_lIST');
        }
    },

    ADD_DEFAULT_ITEM_ROLE: async (context, {grantee, grantor}) => {
        const item = [{
            grantor: +grantor.id,
            grantee: +grantee.id,
            granted: 'r'
        }];
        try {
            await patchObjectDefaultPermissions(state.itemId, grantor.id, item);
        } catch {} finally {
            context.dispatch('SEARCH_DEFAULT_LIST');
        }
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },

    // [R]ecord-[b]ased [A]ccess [C]ontrol list
    SEARCH_DEFAULT_LIST: async (context) => {
        if (state.itemId) {
            const rbac = await fetchObjclassDefaultList(state.itemId, state.itemPage, state.itemSize, state.itemSearch);
            context.commit('CACHE_DEFAULT_LIST', rbac);
        }
    },

    TOGGLE_DEFAULT_MODE: async (context, {mode, ruleName, index}) => {
        let have;
        let want;

        const rule = state.itemPermissionsDefaultList[index];
        if(ruleName == 'r' || ruleName == 'w' || ruleName == 'd') { have = rule.perm[ruleName];}
        switch (mode.id) {
            case 1:
                want = ruleName;
                break;
            case 2:
                want = have.rule || ruleName;
                break;
            case 3:
                want = ruleName + ruleName;
                break;
            default:
                console.log(`Cound not identify access mode '${want}'`);
                return;
        }
        context.commit('TOGGLE_DEFAULT_MODE', {mode, ruleName, index});
        let ctl = {
            grants: want,
            grantee: +(rule.grantee.id)
        };
        //if (!readState) ctl.grants += 'r'; // ADD (!)
        try {
            await toggleObjclassDefaultMode(state.itemId, +(rule.grantor.id), ctl);
        } catch {
            context.dispatch('SEARCH_DEFAULT_LIST');
        }
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

    SET_SIZE: (context, size) => {
        state.itemSize = size;
    },

    SET_ITEM_PERMISSIONS_SEARCH: (context, search) => {
        state.itemSearch = search;
    },

    INCREMENT_ITEM_PERMISSIONS_PAGE: (state) => {
        state.itemPage++;
    },

    DECREMENT_ITEM_PERMISSIONS_PAGE: (state) => {
        state.itemPage--;
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
    // [R]ecord-[b]ased [A]ccess [C]ontrol list
    CACHE_DEFAULT_LIST: (state, rbac) => {
        state.itemPermissionsDefaultList = rbac;
    },

    TOGGLE_DEFAULT_MODE: (state, {mode, ruleName, index}) => {
        if(ruleName == 'r') {  state.itemPermissionsDefaultList[index].perm.r = mode;}
        if(ruleName == 'w') {  state.itemPermissionsDefaultList[index].perm.w = mode;}
        if(ruleName == 'd') {  state.itemPermissionsDefaultList[index].perm.d = mode;}       
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
