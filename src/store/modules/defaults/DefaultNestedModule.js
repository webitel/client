import proxy from '../../../utils/editProxy';

export class DefaultNestedModule {
    constructor(defaultState) {
        this.state = {
            parentId: 0,
            ...defaultState()
        };

        this.actions = {
            SET_PARENT_ITEM_ID: (context, id) => {
                context.commit('SET_PARENT_ITEM_ID', id);
            },

            SET_ITEM_ID: (context, id) => {
                if (id !== 'new') context.commit('SET_ITEM_ID', id);
            },

            LOAD_DATA_LIST: async (context) => {
                if(context.state.parentId) {
                    const response = await context.dispatch('GET_LIST');
                    context.dispatch('RESET_ITEM_STATE');
                    context.commit('SET_DATA_LIST', response);
                }
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

            ADD_ITEM: async (context) => {
                if (!context.state.itemId) {
                    const id = await context.dispatch('POST_ITEM');
                    context.dispatch('SET_ITEM_ID', id);
                }
            },

            UPDATE_ITEM: async (context) => {
                if (context.state.itemInstance._dirty) {
                    await context.dispatch('UPD_ITEM');
                }
            },

            REMOVE_ITEM: async (context, index) => {
                const id = context.state.dataList[index].id;
                context.commit('REMOVE_ITEM', index);
                try {
                    await context.dispatch('DELETE_ITEM', id);
                } catch {
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

            SET_ITEM_ID: (state, id) => {
                state.itemId = id;
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

            SET_ITEM_PROPERTY: (state, {prop, value}) => {
                state.itemInstance[prop] = value;
            },

            SET_ITEM: (state, item) => {
                state.itemInstance = item;
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