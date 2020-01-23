import {getCalendarPermissions, patchCalendarPermissions} from "../../../../api/lookups/calendars/calendars";

const defaultState = () => {
    return {
        dataList: [],
        size: '10',
        search: '',
        page: 0,
        isNextPage: true,
    }
};

const state = {
    parentId: 0,
    ...defaultState()
};

const getters = {};

const actions = {
    SET_PARENT_ITEM_ID: (context, id) => {
        context.commit('SET_PARENT_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        if (state.parentId) {
            const dataList = await getCalendarPermissions(state.parentId, state.page, state.size, state.search);
            context.dispatch('RESET_ITEM_STATE');
            context.commit('SET_DATA_LIST', dataList);
        }
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    NEXT_PAGE: (context) => {
        if(state.isNextPage) {
            context.commit('INCREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    PREV_PAGE: (context) => {
        if(state.page) {
            context.commit('DECREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    PATCH_ITEM_PERMISSIONS: async (context, {prop, index}) => {
        const readState = state.dataList[index].access.r;
        await context.commit('PATCH_ITEM_PERMISSIONS', {prop, index});
        let item = [{
            grantee_id: state.dataList[index].grantee.id,
            access: prop
        }];
        if (!readState) item[0].access += 'r';
        try {
            await patchCalendarPermissions(state.parentId, item);
        } catch {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    ADD_ITEM_ROLE: async (context, role) => {
        const item = [{
            grantee_id: role.id,
            access: 'r'
        }];
        try {
            await patchCalendarPermissions(state.parentId, item);
        } catch {}
        finally {
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
    },
};

const mutations = {
    SET_PARENT_ITEM_ID: (state, id) => {
        state.parentId = id;
    },

    SET_DATA_LIST: (state, list) => {
        state.dataList = list;
    },

    SET_SIZE: (context, size) => {
        state.size = size;
    },

    SET_SEARCH: (context, search) => {
        state.search = search;
    },

    INCREMENT_PAGE: (state) => {
        state.page++;
    },

    DECREMENT_PAGE: (state) => {
        state.page--;
    },

    PATCH_ITEM_PERMISSIONS: (state, {prop, index}) => {
        // if 'read' checkbox switches to false, make all operations false
        if (prop === 'r' && state.dataList[index].access.r) {
            Object.keys(state.dataList[index].access).map(item => {
                state.dataList[index].access[item] = false
            });
            return
            // else if another operation switches to true with unactive 'read', activate 'read' too
        } else if (!state.dataList[index].access.r && prop !== 'r') {
            state.dataList[index].access.r = true;
        }
        state.dataList[index].access[prop] = !state.dataList[index].access[prop];

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
