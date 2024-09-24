import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import ShiftTemplatesAPI from '../api/shiftTemplates.js';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
    times: [],
  },
};

const actions = {
  ADD_TEMPLATE: (context) => {
    const pair = { start: 9 * 60, end: 20 * 60, duration : 11 * 60 };
    context.commit('ADD_TEMPLATE', pair);
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  SET_TEMPLATE: (context, { index, prop, value }) => {
    context.commit('SET_TEMPLATE', {
      index,
      prop,
      value,
    });
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  DELETE_TEMPLATE: (context, index) => {
    context.commit('DELETE_TEMPLATE', index);
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
}

const mutations = {
  ADD_TEMPLATE: (state, pair) => {
    state.itemInstance.times.push(pair);
  },
  SET_TEMPLATE: (state, { index, prop, value }) => {
    state.itemInstance.times[index][prop] = value;
  },
  DELETE_TEMPLATE: (state, index) => {
    state.itemInstance.times.splice(index, 1);
  },
};

const shiftTemplates = new ObjectStoreModule({ resettableState, headers })
.attachAPIModule(ShiftTemplatesAPI)
.generateAPIActions()
.getModule({ actions, mutations });

export default shiftTemplates;
