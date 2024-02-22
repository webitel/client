import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';
import GlobalVariablesAPI from '../api/global-variables';

const actions = {
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

const globalVariables = new ObjectStoreModule({ headers })
  .attachAPIModule(GlobalVariablesAPI)
  .generateAPIActions()
  .getModule({ actions });

export default globalVariables;
