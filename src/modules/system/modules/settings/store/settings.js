import SettingsAPI from '../api/settings';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const actions = {
  SET_ITEM: async (context, item) => {
    context.commit('SET_ITEM', item);
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

const settings = new ObjectStoreModule({ headers })
.attachAPIModule(SettingsAPI)
.generateAPIActions()
.getModule({ actions });

export default settings;
