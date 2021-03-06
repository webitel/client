import proxy from '../../../../utils/editProxy';
import holidays from './calendar-holidays';
import permissions from './permissions';
import {
    addCalendar,
    deleteCalendar,
    getCalendar,
    getCalendarList,
    updateCalendar
} from "../../../../api/lookups/calendars/calendars";

const defaultAccepts = () => {
    const accepts = [];
    for(let i = 0; i < 7; i++) {
        accepts.push({
            day: i,
            disabled: false,
            start: 9 * 60,
            end: 20 * 60,
        });
    }
    return accepts;
};

const defaultState = () => {
    return {
        itemId: 0,
        itemInstance: {
            name: '',
            timezone: {},
            description: '',
            startAt: Date.now(),
            endAt: Date.now(),
            expires: false,
            accepts: defaultAccepts(),
            excepts: []
        },
    };
};

const state = {
    dataList: [],
    size: '10',
    search: '',
    page: 1,
    isNextPage: true,
    ...defaultState()
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getCalendarList(state.page, state.size, state.search);
    },

    GET_ITEM: async () => {
        return await getCalendar(state.itemId);
    },

    POST_ITEM: async () => {
        return await addCalendar(state.itemInstance);
    },

    UPD_ITEM: async () => {
        await updateCalendar(state.itemId, state.itemInstance);
    },

    DELETE_ITEM: async (context, id) => {
        await deleteCalendar(id);
    },

    SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await context.dispatch('GET_LIST');
        context.dispatch('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response.list);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    NEXT_PAGE: (context) => {
        if (state.isNextPage) {
            context.commit('INCREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    PREV_PAGE: (context) => {
        if (state.page) {
            context.commit('DECREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    LOAD_ITEM: async (context) => {
        if (state.itemId) {
            const item = await context.dispatch('GET_ITEM');
            context.commit('SET_ITEM', proxy(item));
        }
    },

    SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
    },

    ADD_ITEM: async (context) => {
        if (!state.itemId) {
            const id = await context.dispatch('POST_ITEM');
            context.dispatch('SET_ITEM_ID', id);
            context.dispatch('LOAD_ITEM');
        }
    },

    UPDATE_ITEM: async (context) => {
        if (state.itemInstance._dirty) {
            await context.dispatch('UPD_ITEM');
            context.dispatch('LOAD_ITEM');
        }
    },

    REMOVE_ITEM: async (context, index) => {
        const id = state.dataList[index].id;
        context.commit('REMOVE_ITEM', index);
        try {
            await context.dispatch('DELETE_ITEM', id);
        } catch {
        }
    },

    SET_ACCEPT_ITEM_PROPERTY: async (context, payload) => {
        context.commit('SET_ACCEPT_ITEM_PROPERTY', payload);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    ADD_ACCEPT_ITEM: (context, day) => {
        // iterates through array and tries to find first day next to param day
        const dayIndex = state.itemInstance.accepts.findIndex(workday => workday.day > day);
        const dayItem = {
            day,
            disabled: false,
            start: 9 * 60,
            end: 20 * 60,
        };
        context.commit('ADD_ACCEPT_ITEM', {index: dayIndex, item: dayItem});
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    REMOVE_ACCEPT_ITEM: (context, index) => {
        context.commit('REMOVE_ACCEPT_ITEM', index);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    ADD_EXCEPT_ITEM: (context, item) => {
        context.commit('ADD_EXCEPT_ITEM', item);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    UPDATE_EXCEPT_ITEM: (context, {index, item}) => {
        context.commit('UPDATE_EXCEPT_ITEM', {index, item});
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    TOGGLE_EXCEPT_ITEM_PROPERTY: (context, index) => {
        context.commit('TOGGLE_EXCEPT_ITEM_PROPERTY', index);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
    },

    REMOVE_EXCEPT_ITEM: async (context, index) => {
        context.commit('REMOVE_EXCEPT_ITEM', index);
        context.commit('SET_ITEM_PROPERTY', {prop: '_dirty', value: true});
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

    SET_ITEM_PROPERTY: (state, {prop, value}) => {
        state.itemInstance[prop] = value;
    },

    SET_ITEM: (state, item) => {
        state.itemInstance = item;
    },

    REMOVE_ITEM: (state, index) => {
        state.dataList.splice(index, 1);
    },

    SET_ACCEPT_ITEM_PROPERTY: (state, {prop, index, value}) => {
        state.itemInstance.accepts[index][prop] = value;
    },

    ADD_ACCEPT_ITEM: (state, {index, item}) => {
        state.itemInstance.accepts.splice(index, 0, item);
    },

    REMOVE_ACCEPT_ITEM: (state, index) => {
        state.itemInstance.accepts.splice(index, 1);
    },

    ADD_EXCEPT_ITEM: (state, item) => {
        state.itemInstance.excepts.push(item);
    },

    UPDATE_EXCEPT_ITEM: (state, {index, item}) => {
        state.itemInstance.excepts[index] = item;
    },

    TOGGLE_EXCEPT_ITEM_PROPERTY: (state, index) => {
        state.itemInstance.excepts[index].repeat = !state.itemInstance.excepts[index].repeat;
    },

    REMOVE_EXCEPT_ITEM: (state, index) => {
        state.itemInstance.excepts.splice(index, 1);
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
    modules: {holidays, permissions}
};
