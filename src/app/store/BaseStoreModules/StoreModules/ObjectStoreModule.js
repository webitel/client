import deepCopy from 'deep-copy';
import BaseStoreModule from '../BaseStoreModule';
import BaseTableModule from '../StoreModuleMixins/BaseTableStoreModuleMixin';
import BaseOpenedInstanceModule from '../StoreModuleMixins/BaseOpenedInstanceStoreModuleMixin';

export default class ObjectStoreModule extends BaseStoreModule {
  getters = {}

  actions = {
    ...BaseTableModule.getActions(),
    ...BaseOpenedInstanceModule.getActions(),

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

  modules = {}

  constructor(resettableState) {
    super();
    this._resettableState = () => deepCopy({
      ...BaseOpenedInstanceModule.generateState(),
      ...resettableState,
    });
    this.state = {
      ...BaseTableModule.generateState(),
      ...this._resettableState(),
    };
  }
}
