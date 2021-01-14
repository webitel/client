import {
    getObjectList,
    getObjectPermissions,
    patchObjectPermissions,
    patchObjectDefaultPermissions,
    updateObject,
    updateObacObject,
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
        operationInstance: {
            dataList: [],
            size: '10',
            search: '',
            page: 1,
            isItemNextPage: false,
        },
        recordsInstance: {
            dataList: [],
            size: '10',
            search: '',
            page: 1,
            isItemNextPage: false,
        },
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
        const response = await getObjectList(state.itemSearch, state.itemPage, state.itemSize);
        context.dispatch('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response.list);
        context.commit('SET_IS_NEXT', response.next);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },
    
    NEXT_PAGE: (context) => {
        if (context.state.isNextPage) {
            context.commit('INCREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    PREV_PAGE: (context) => {
        if (context.state.page) {
            context.commit('DECREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    TOGGLE_ITEM_PROPERTY: async (context, {prop, item, value}) => {
        let changes = prop == 'obac' ? {obac: value} : {rbac: value}   
              
        try {
            await updateObject(item.id, changes);
        } catch(err) {
            throw err;
        } finally {
            await context.dispatch('LOAD_DATA_LIST');
        }
    },

    SET_ITEM_PERMISSIONS_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_OPERATION_PERMISSIONS_SIZE: (context, size) => {
        context.commit('SET_OPERATION_SIZE', size);
    },

    SET_RECORDS_PERMISSIONS_SIZE: (context, size) => {
        context.commit('SET_RECORDS_SIZE', size);
    },    

    SET_ITEM_PERMISSIONS_SEARCH: (context, search) => {
        context.commit('SET_ITEM_PERMISSIONS_SEARCH', search);
    },

    SET_OPERATION_PERMISSIONS_SEARCH: (context, search) => {
        context.commit('SET_OPERATION_PERMISSIONS_SEARCH', search);
    },

    SET_RECORDS_PERMISSIONS_SEARCH: (context, search) => {
        context.commit('SET_RECORDS_PERMISSIONS_SEARCH', search);
    },

    NEXT_ITEM_PERMISSIONS_PAGE: async (context) => {
        if(state.isItemNextPage) {
            await context.commit('INCREMENT_ITEM_PERMISSIONS_PAGE');            
            context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_lIST');      
        }
    },

    PREV_ITEM_PERMISSIONS_PAGE: async (context) => {    
        await context.commit('DECREMENT_ITEM_PERMISSIONS_PAGE');            
        context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_lIST');                
    },

    NEXT_OPERATION_PERMISSIONS_PAGE: async (context) => {
        if(state.operationInstance.isItemNextPage) {
            await context.commit('INCREMENT_OPERATION_PERMISSIONS_PAGE');            
            context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_lIST');      
        }
    },

    PREV_OPERATION_PERMISSIONS_PAGE: async (context) => {    
        await context.commit('DECREMENT_OPERATION_PERMISSIONS_PAGE');            
        context.dispatch('LOAD_ITEM_PERMISSIONS_DATA_lIST');                
    },

    NEXT_RECORDS_PERMISSIONS_PAGE: async (context) => {
        if(state.recordsInstance.page) {
            await context.commit('INCREMENT_RECORD_PERMISSIONS_PAGE');            
            context.dispatch('SEARCH_DEFAULT_LIST');      
        }
    },

    PREV_RECORDS_PERMISSIONS_PAGE: async (context) => {    
        await context.commit('DECREMENT_RECORD_PERMISSIONS_PAGE');            
        context.dispatch('SEARCH_DEFAULT_LIST');                
    },

    LOAD_ITEM_PERMISSIONS_DATA_lIST: async (context) => {
        if (state.itemId) {
            const response = await getObjectPermissions(state.itemId, state.operationInstance.page, state.operationInstance.size, state.operationInstance.search);
            context.commit('SET_ITEM_PERMISSIONS_DATA_lIST', response.list);
            context.commit('SET_IS_OPERATIONS_NEXT', response.next);
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

    TOGGLE_GENERAL_MODE: async (context, {mode, ruleName, item}) => {
        let have;
        let want;

        const rule = item;
        
        if(ruleName == 'c' || ruleName == 'r' || ruleName == 'w' || ruleName == 'd') { have = rule.access[ruleName];}
        switch (mode.id) {
            case 1:
                want = ruleName;
                break;
            case 2:
                debugger
                want = have.rule || ruleName;
                break;
            case 3:
                want = ruleName + ruleName;
                break;
            default:
                console.log(`Cound not identify access mode '${want}'`);
                return;
        }
        want = want.replace('cc', 'xx').replace('c', 'x');
        let ctl = {
            grantee: +(item.grantee.id),
            grants: want
        };
        try {
            await patchObjectPermissions(state.itemId, [ctl]);
        } catch(err) {
            throw err;
        } finally {
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
        } catch {            
        } finally {
            context.dispatch('SEARCH_DEFAULT_LIST');
        }
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },

    // [R]ecord-[b]ased [A]ccess [C]ontrol list
    SEARCH_DEFAULT_LIST: async (context) => {
        if (state.itemId) {
            const rbac = await fetchObjclassDefaultList(state.itemId, state.recordsInstance.page, state.recordsInstance.size, state.recordsInstance.search);
            context.commit('CACHE_DEFAULT_LIST', rbac.list);
            context.commit('SET_IS_RECORDS_NEXT', rbac.next);            
        }
    },

    TOGGLE_DEFAULT_MODE: async (context, {mode, ruleName, item}) => {
        let have;
        let want;

        const rule = item;
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
        let ctl = {
            grants: want,
            grantee: +(rule.grantee.id)
        };
        try {
            await toggleObjclassDefaultMode(state.itemId, +(rule.grantor.id), ctl);
        } catch(err) {
            throw err;
        } finally {
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
        state.itemSearch = search;
    },

    INCREMENT_PAGE: (state) => {
        state.itemPage++;
    },

    DECREMENT_PAGE: (state) => {
        state.itemPage--;
    },

    SET_IS_NEXT: (state, isNext) => {
        state.isItemNextPage = isNext;
    },

    SET_IS_OPERATIONS_NEXT: (state, isNext) => {
        state.operationInstance.isItemNextPage = isNext;
    },

    SET_IS_RECORDS_NEXT: (state, isNext) => {
        state.recordsInstance.isItemNextPage = isNext;
    },

    TOGGLE_ITEM_PROPERTY: (state, {prop, index}) => {
        state.dataList[index][prop] = !state.dataList[index][prop];
    },

    SET_SIZE: (state, size) => {
        state.itemSize = size;
    },

    SET_OPERATION_SIZE: (state, size) => {
        state.operationInstance.size = size;
    },

    SET_RECORDS_SIZE: (state, size) => {
        state.recordsInstance.size = size;
    },

    SET_ITEM_PERMISSIONS_SEARCH: (state, search) => {
        state.itemSearch = search;
    },

    SET_OPERATION_PERMISSIONS_SEARCH: (state, search) => {
        state.operationInstance.search = search;
    },

    SET_RECORDS_PERMISSIONS_SEARCH: (state, search) => {
        state.recordsInstance.search = search;
    },

    INCREMENT_ITEM_PERMISSIONS_PAGE: (state) => {
        state.itemPage++;
    },

    DECREMENT_ITEM_PERMISSIONS_PAGE: (state) => {
        state.itemPage--;
    },

    INCREMENT_OPERATION_PERMISSIONS_PAGE: (state) => {
        state.operationInstance.page++;
    },

    DECREMENT_OPERATION_PERMISSIONS_PAGE: (state) => {
        state.operationInstance.page--;
    },

    INCREMENT_RECORD_PERMISSIONS_PAGE: (state) => {
        state.recordsInstance.page++;
    },

    DECREMENT_RECORD_PERMISSIONS_PAGE: (state) => {
        state.recordsInstance.page--;
    },

    SET_ITEM_PERMISSIONS_DATA_lIST: (state, item) => {
        state.operationInstance.dataList = item;
    },

    PATCH_ITEM_PERMISSIONS: (state, {prop, item}) => {
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
        Object.assign(defaultState(), state);
    },
    // [R]ecord-[b]ased [A]ccess [C]ontrol list
    CACHE_DEFAULT_LIST: (state, rbac) => {
        state.recordsInstance.dataList = rbac;
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
