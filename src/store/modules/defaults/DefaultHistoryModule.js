export class DefaultHistoryModule {
    constructor(defaultState) {
        this.state = {
            dataList: [],
            size: '10',
            search: '',
            page: 1,
            isNextPage: true,
            itemId: 0,
            ...defaultState()
        };

        this.actions = {
            SET_HISTORY_ITEM_ID: (context, id) => {
                context.commit('SET_HISTORY_ITEM_ID', id);
            },

            LOAD_HISTORY_DATA_LIST: async (context) => {
                const response = await context.dispatch('GET_HISTORY_LIST');
                context.commit('SET_HISTORY_DATA_LIST', response);
            },

            SET_HISTORY_SIZE: (context, size) => {
                context.commit('SET_HISTORY_SIZE', size);
            },

            SET_HISTORY_SEARCH: (context, search) => {
                context.commit('SET_HISTORY_SEARCH', search);
            },

            NEXT_HISTORY_PAGE: (context) => {
                if(context.state.isNextPage) {
                    context.commit('INCREMENT_HISTORY_PAGE');
                    context.dispatch('LOAD_HISTORY_DATA_LIST');
                }
            },

            PREV_HISTORY_PAGE: (context) => {
                if(context.state.page) {
                    context.commit('DECREMENT_HISTORY_PAGE');
                    context.dispatch('LOAD_HISTORY_DATA_LIST');
                }
            },

            SET_HISTORY_DATE: (context, date) => {
                context.commit('SET_HISTORY_DATE', date);
                context.dispatch('LOAD_HISTORY_DATA_LIST');
            },

            SET_HISTORY_FROM: (context, from) => {
                context.commit('SET_HISTORY_FROM', from);
                context.dispatch('LOAD_HISTORY_DATA_LIST');
            },

            SET_HISTORY_TO: (context, to) => {
                context.commit('SET_HISTORY_TO', to);
                context.dispatch('LOAD_HISTORY_DATA_LIST');
            },

            RESET_ITEM_STATE: async (context) => {
                context.commit('RESET_ITEM_STATE');
            },
        };

        this.mutations = {
            SET_HISTORY_ITEM_ID: (state, id) => {
                state.itemId = id;
            },

            SET_HISTORY_DATA_LIST: (state, list) => {
                state.dataList = list;
            },

            SET_HISTORY_SIZE: (state, size) => {
                state.size = size;
            },

            SET_HISTORY_SEARCH: (state, search) => {
                state.search = search;
            },

            INCREMENT_HISTORY_PAGE: (state) => {
                state.page++;
            },

            DECREMENT_HISTORY_PAGE: (state) => {
                state.page--;
            },

            SET_HISTORY_DATE: (state, date) => { // TODO: DELETE ME AFTER AGENT HISTORY REFACTOR/DELETE
                state.date = date;
            },

            SET_HISTORY_FROM: (state, from) => {
                state.from = from;
            },

            SET_HISTORY_TO: (state, to) => {
                state.to = to;
            },

            RESET_ITEM_STATE: (state) => {
                Object.assign(state, defaultState());
            },
        };
    }
}