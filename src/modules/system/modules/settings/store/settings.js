import SettingsAPI from '../api/settings';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const actions = {
  SET_ITEM_PROPERTY: (context, payload) => {
    context.commit('SET_ITEM_PROPERTY', payload);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
  SET_ITEM_ID: (context, id) => {
    context.commit('SET_ITEM_ID', id);
  },
  SET_ITEM: async (context, item) => {
    context.commit('SET_ITEM', item);
    context.commit('SET_ITEM_ID', item.id);
  },
  ADD_ITEM: async (context) => {
    if (!context.state.itemId) {
      const { id } = await context.dispatch('POST_ITEM');
      context.dispatch('SET_ITEM_ID', id);
      await context.dispatch('LOAD_DATA_LIST');
    }
  },
  UPDATE_ITEM: async (context) => {
    if (context.state.itemInstance._dirty) {
      await context.dispatch('UPD_ITEM');
      await context.dispatch('LOAD_DATA_LIST');
    }
  },
};
const mutations = {
  SET_ITEM_PROPERTY: (state, { prop, value }) => {
    state.itemInstance[prop] = value;
  },
  SET_ITEM: (state, item) => {
    state.itemInstance = item;
  },
  SET_ITEM_ID: (state, id) => {
    state.itemId = id;
  },
};

const settings = new ObjectStoreModule({ headers })
.attachAPIModule(SettingsAPI)
.generateAPIActions()
.getModule({ actions, mutations });

export default settings;
