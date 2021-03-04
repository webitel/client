import proxy from '../../../../utils/editProxy';
import {
  addCalendar,
  deleteCalendar,
  getCalendar,
  getCalendarList,
  updateCalendar,
} from "../../../../api/lookups/calendars/calendars";
import DefaultPermissionsModule from '../../defaults/DefaultPermissionsModule';


const defaultAccepts = () => {
  const accepts = [];
  for (let i = 0; i < 7; i++) {
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
      excepts: [],
    },
  };
};

const state = {
  dataList: [],
  size: '10',
  search: '',
  page: 1,
  isNextPage: true,
  ...defaultState(),
};

const getters = {};

const actions = {
  GET_LIST: (context) => {
    return getCalendarList(context.state);
  },

  GET_ITEM: (context) => {
    return getCalendar(context.state);
  },

  POST_ITEM: (context) => {
    return addCalendar(context.state);
  },

  UPD_ITEM: (context) => {
    return updateCalendar(context.state);
  },

  DELETE_ITEM: (context, id) => {
    return deleteCalendar({ id });
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
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },

  ADD_ACCEPT_ITEM: (context, day) => {
    const value = context.state.itemInstance.accepts;
    // iterates through array and tries to find first day next to param day
    const dayIndex = value.findIndex(workday => workday.day > day);
    const dayItem = {
      day,
      disabled: false,
      start: 9 * 60,
      end: 20 * 60,
    };
    value.splice(dayIndex, 0, dayItem);
    context.commit('SET_ITEM_PROPERTY', { prop: 'accepts', value });
  },

  REMOVE_ACCEPT_ITEM: (context, index) => {
    const value = context.state.itemInstance.accepts;
    value.splice(index, 1);
    context.commit('SET_ITEM_PROPERTY', { prop: 'accepts', value });
  },

  ADD_EXCEPT_ITEM: (context, item) => {
    const value = context.state.itemInstance.excepts.concat(item);
    context.commit('SET_ITEM_PROPERTY', { prop: 'excepts', value });
  },

  UPDATE_EXCEPT_ITEM: (context, { index, item }) => {
    const value = context.state.itemInstance.excepts;
    value.splice(index, 1, item);
    context.commit('SET_ITEM_PROPERTY', { prop: 'excepts', value });
  },

  REMOVE_EXCEPT_ITEM: (context, index) => {
    const value = context.state.itemInstance.excepts;
    value.splice(index, 1);
    context.commit('SET_ITEM_PROPERTY', { prop: 'excepts', value });
  },

  SET_EXCEPT_ITEM_PROPERTY: (context, { index, prop, value }) => {
    context.commit('SET_EXCEPT_ITEM_PROPERTY', { index, prop, value });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
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

  SET_ITEM_PROPERTY: (state, { prop, value }) => {
    state.itemInstance[prop] = value;
  },

  SET_ITEM: (state, item) => {
    state.itemInstance = item;
  },

  REMOVE_ITEM: (state, index) => {
    state.dataList.splice(index, 1);
  },

  SET_ACCEPT_ITEM_PROPERTY: (state, { prop, index, value }) => {
    state.itemInstance.accepts[index][prop] = value;
  },

  SET_EXCEPT_ITEM_PROPERTY: (state, { index, prop, value }) => {
    state.itemInstance.excepts[index][prop] = value;
  },

  RESET_ITEM_STATE: (state) => {
    Object.assign(state, defaultState());
  },
};

const PERMISSIONS_API_URL = '/calendars';
const permissions = new DefaultPermissionsModule()
  .generateAPIMethods(PERMISSIONS_API_URL)
  .getModule();


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { permissions },
};
