import proxy from '../../../utils/editProxy';

export class DefaultModule {
    constructor(defaultState) {
        this.state = {
            dataList: [],
            size: 10,
            search: '',
            page: 1,
            isNextPage: false,
            ...defaultState()
        };

        this.actions = {
            SET_ITEM_ID: (context, id) => {
                if (id !== 'new') context.commit('SET_ITEM_ID', id);
                else context.commit('SET_ITEM_ID', 0);
            },

            LOAD_DATA_LIST: async (context) => {
                if(context.state.search) {
                    context.commit('SET_FIRST_PAGE');
                }
                const response = await context.dispatch('GET_LIST');
                await context.dispatch('RESET_ITEM_STATE');
                context.commit('SET_DATA_LIST', response.list);
                context.commit('SET_IS_NEXT', response.next);
            },

            SET_SIZE: (context, size) => {
                context.commit('SET_SIZE', size);
            },

            SET_SEARCH: (context, search) => {
                context.commit('SET_SEARCH', search);
            },

            NEXT_PAGE: (context) => {
                if(context.state.isNextPage) {
                    context.commit('INCREMENT_PAGE');
                    context.dispatch('LOAD_DATA_LIST');
                }
            },

            PREV_PAGE: (context) => {
                if(context.state.page) {
                    context.commit('DECREMENT_PAGE');
                    context.dispatch('LOAD_DATA_LIST');
                }
            },

            LOAD_ITEM: async (context) => {
                if (context.state.itemId) {
                    const item = await context.dispatch('GET_ITEM');
                    context.commit('SET_ITEM', proxy(item));
                }
            },

            SET_ITEM_PROPERTY: (context, payload) => {
                context.commit('SET_ITEM_PROPERTY', payload);
            },

            PATCH_ITEM_PROPERTY: async (context, {index, prop, value}) => {
                await context.commit('PATCH_ITEM_PROPERTY', {index, prop, value});
                const id = context.state.dataList[index].id;
                const changes = {};
                changes[prop] = value;
                try {
                    await context.dispatch('PATCH_ITEM', {id, changes});
                } catch {
                    context.dispatch('LOAD_DATA_LIST');
                }
            },

            ADD_ITEM: async (context) => {
                if (!context.state.itemId) {
                    const id = await context.dispatch('POST_ITEM');
                    context.dispatch('SET_ITEM_ID', id);
                    context.dispatch('LOAD_ITEM');
                }
            },

            UPDATE_ITEM: async (context) => {
                if (context.state.itemInstance._dirty) {
                    await context.dispatch('UPD_ITEM');
                    context.dispatch('LOAD_ITEM');
                }
            },

            REMOVE_ITEM: async (context, index) => {
                const id = context.state.dataList[index].id;
                context.commit('REMOVE_ITEM', index);
                try {
                    await context.dispatch('DELETE_ITEM', id);
                } catch (err) {
                    throw err;
                }
            },

            RESET_ITEM_STATE: async (context) => {
                context.commit('RESET_ITEM_STATE');
            },
        };

        this.mutations = {
            SET_ITEM_ID: (state, id) => {
                state.itemId = id;
            },

            SET_DATA_LIST: (state, list) => {
                state.dataList = list;
            },

            SET_SIZE: (context, size) => {
                context.size = size;
            },

            SET_SEARCH: (context, search) => {
                context.search = search;
            },

            INCREMENT_PAGE: (state) => {
                state.page++;
            },

            DECREMENT_PAGE: (state) => {
                state.page--;
            },

            SET_FIRST_PAGE: (state) => {
                state.page = 1; 
            },

            SET_IS_NEXT: (state, next) => {
                state.isNextPage = next;
            },

            SET_ITEM_PROPERTY: (state, {prop, value}) => {
                state.itemInstance[prop] = value;
            },

            SET_ITEM: (state, item) => {
                state.itemInstance = item;
            },

            PATCH_ITEM_PROPERTY: (state, {index, prop, value}) => {
                state.dataList[index][prop] = value;
            },

            REMOVE_ITEM: (state, index) => {
                state.dataList.splice(index, 1);
            },

            RESET_ITEM_STATE: (state) => {
                Object.assign(state, defaultState());
            },
        };
    }
}