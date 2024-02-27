import BaseStoreModule
  from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';
import deepCopy from 'deep-copy';
import BaseOpenedInstanceModule
  from '../StoreModuleMixins/BaseOpenedInstanceStoreModuleMixin';
import BaseTableModule from '../StoreModuleMixins/BaseTableStoreModuleMixin';

export default class ObjectStoreModule extends BaseStoreModule {
  getters = {};

  actions = {
    ...BaseTableModule.getActions(),
    ...BaseOpenedInstanceModule.getActions(),
    // these actions are not universal, so sometimes they must be rewritten in models stores
    // because of need to reload the main page of the module after add or update item
    // like in this task: https://webitel.atlassian.net/browse/WTEL-4195
    // SET_ITEM_ID and LOAD_ITEM we need if we have separate page for add and update item.
    // And we need LOAD_DATA_LIST if we have popup for add and update item
    ADD_ITEM: async (context) => {
      if (!context.state.itemId) {
        const { id } = await context.dispatch('POST_ITEM');
        await context.dispatch('SET_ITEM_ID', id);
        context.dispatch('LOAD_ITEM');
      }
    },
    UPDATE_ITEM: async (context) => {
      if (context.state.itemInstance._dirty) {
        await context.dispatch('UPD_ITEM');
        context.dispatch('LOAD_ITEM');
      }
    },
  };

  mutations = {
    ...BaseTableModule.getMutations(),
    ...BaseOpenedInstanceModule.getMutations(),

    RESET_ITEM_STATE: (state) => {
      Object.assign(state, this._resettableState());
    },
  };

  modules = {};

  constructor({ resettableState, headers } = {}) {
    super();
    this._resettableState = () => deepCopy({
      ...BaseOpenedInstanceModule.generateState(),
      ...resettableState,
    });
    this.state = {
      ...BaseTableModule.generateState(),
      headers,
      ...this._resettableState(),
    };
  }
}
