import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import ConfigurationAPI from '../api/configuration';
import headers from './_internals/headers';

const actions = {
  // actions from ObjectStoreModule must be rewritten because there is a need to reload
  // the main page of the module after add or update item
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

const configuration = new ObjectStoreModule({ headers })
.attachAPIModule(ConfigurationAPI)
.generateAPIActions()
.getModule({ actions });

export default configuration;
