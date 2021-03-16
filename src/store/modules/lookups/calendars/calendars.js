import CalendarsAPI from '../../../../api/lookups/calendars/calendars';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import DefaultPermissionsModule from '../../../BaseModules/defaults/DefaultPermissionsModule';

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

  REMOVE_EXCEPT_ITEM: (context, index) => {
    const value = context.state.itemInstance.excepts;
    value.splice(index, 1);
    context.commit('SET_ITEM_PROPERTY', { prop: 'excepts', value });
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
const permissions = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();


const calendars = new DefaultModule(resettableState)
  .attachAPIModule(CalendarsAPI)
  .generateAPIActions()
  .setChildModules({ permissions })
  .getModule({ actions, mutations });

export default calendars;
