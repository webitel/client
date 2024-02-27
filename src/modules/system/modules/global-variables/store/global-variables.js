import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';
import GlobalVariablesAPI from '../api/global-variables';

const actions = {
  // actions from ObjectStoreModule must be rewritten because there is a need to reload
  // the main page of the module after add ore update item
  // task: https://webitel.atlassian.net/browse/WTEL-4195
  // and here we need LOAD_DATA_LIST instead LOAD_ITEM
  ADD_ITEM: async (context) => {
    if (!context.state.itemId) {
      await context.dispatch('POST_ITEM');
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
