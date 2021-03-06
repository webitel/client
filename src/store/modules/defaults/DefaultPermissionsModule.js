export class DefaultPermissionsModule {
    constructor(defaultState) {
        this.state = {
            parentId: 0,
            ...defaultState()
        };

        this.actions = {
            SET_PARENT_ITEM_ID: (context, id) => {
                context.commit('SET_PARENT_ITEM_ID', id);
            },

            LOAD_DATA_LIST: async (context) => {
                if (context.state.parentId) {
                    const dataList = await context.dispatch('LOAD_PERMISSIONS_LIST');
                    // context.dispatch('RESET_ITEM_STATE');
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

            PATCH_ITEM_PERMISSIONS: async (context, {prop, index}) => {
                const readState = context.state.dataList[index].access.r;
                await context.commit('PATCH_ITEM_PERMISSIONS', {prop, index});
                let item = [{
                    grantee: +context.state.dataList[index].grantee.id,
                    grants: prop
                }];
                if (!readState) item[0].grants += 'r';
                try {
                    await context.dispatch('PATCH_PERMISSIONS', item);
                } catch {
                    context.dispatch('LOAD_DATA_LIST');
                }
            },

            ADD_ITEM_ROLE: async (context, role) => {
                const item = [{
                    grantee: +role.id,
                    grants: 'r'
                }];
                try {
                    await context.dispatch('PATCH_PERMISSIONS', item);
                } catch {
                } finally {
                    context.dispatch('LOAD_DATA_LIST');
                }
            },

            RESET_ITEM_STATE: async (context) => {
                context.commit('RESET_ITEM_STATE');
            },
        };

        this.mutations = {
            SET_PARENT_ITEM_ID: (state, id) => {
                state.parentId = id;
            },

            SET_DATA_LIST: (state, list) => {
                state.dataList = list;
            },

            SET_SIZE: (state, size) => {
                state.size = size;
            },

            SET_SEARCH: (state, search) => {
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
    }
}