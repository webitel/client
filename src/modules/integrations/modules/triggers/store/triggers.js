import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import TriggersAPI from '../api/triggers';
import headers from './_internals/headers';
import TriggerTypes from '../lookups/TriggerTypes.lookup';

const resettableState = {
  itemInstance: {
    description: '',
    enabled: true,
    name: '',
    schema: {},
    timeout: 60,
    timezone: {},
    type: TriggerTypes[0],
    variables: [],
  },
};

const actions = {
  ADD_VARIABLE_PAIR: (context) => {
    const pair = { key: '', value: '' };
    context.commit('ADD_VARIABLE_PAIR', pair);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
  SET_VARIABLE_PROP: (context, { index, prop, value }) => {
    context.commit('SET_VARIABLE_PROP', { index, prop, value });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
  DELETE_VARIABLE_PAIR: (context, index) => {
    context.commit('DELETE_VARIABLE_PAIR', index);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
};

const mutations = {
  ADD_VARIABLE_PAIR: (state, pair) => {
    state.itemInstance.variables.push(pair);
  },
  SET_VARIABLE_PROP: (state, { index, prop, value }) => {
    state.itemInstance.variables[index][prop] = value;
  },
  DELETE_VARIABLE_PAIR: (state, index) => {
    state.itemInstance.variables.splice(index, 1);
  },
};

const triggers = new ObjectStoreModule({ resettableState, headers })
.attachAPIModule(TriggersAPI)
.generateAPIActions()
.getModule({ actions, mutations });

export default triggers;
