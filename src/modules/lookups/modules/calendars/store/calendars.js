import CalendarsAPI from '../api/calendars';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import headers from './_internals/headers';

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

const resettableState = {
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

const actions = {
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

  DELETE_EXCEPT_ITEM: async (context, deleted) => {
    let action = 'DELETE_SINGLE_EXCEPT_ITEM';
    if (Array.isArray(deleted)) {
      if (deleted.length) action = 'DELETE_BULK_EXCEPT_ITEMS';
    }
    try {
      await context.dispatch(action, deleted);
    } catch (err) {
      throw err;
    }
  },
  DELETE_SINGLE_EXCEPT_ITEM: async (context, item) => {
    const { excepts } = context.state.itemInstance;
    excepts.splice(excepts.indexOf(item), 1);
    context.commit('SET_ITEM_PROPERTY', { prop: 'excepts', value: excepts });
  },
  DELETE_BULK_EXCEPT_ITEMS: async (context, deleted) => {
    return Promise.allSettled(deleted.map((item) => context.dispatch('DELETE_SINGLE_EXCEPT_ITEM', item)));
  },

  SET_EXCEPT_ITEM_PROPERTY: (context, { index, prop, value }) => {
    context.commit('SET_EXCEPT_ITEM_PROPERTY', { index, prop, value });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
};

const mutations = {
  SET_ACCEPT_ITEM_PROPERTY: (state, { prop, index, value }) => {
    state.itemInstance.accepts[index][prop] = value;
  },

  SET_EXCEPT_ITEM_PROPERTY: (state, { index, prop, value }) => {
    state.itemInstance.excepts[index][prop] = value;
  },
};

const PERMISSIONS_API_URL = '/calendars';
const permissions = new PermissionsStoreModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();


const calendars = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(CalendarsAPI)
  .generateAPIActions()
  .setChildModules({ permissions })
  .getModule({ actions, mutations });

export default calendars;
