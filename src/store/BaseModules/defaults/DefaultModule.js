import deepCopy from 'deep-copy';
import BaseStoreModule from '../bases/BaseStoreModule';
import BaseTableModule from '../bases/BaseTableModule';
import BaseOpenedInstanceModule from '../bases/BaseOpenedInstanceModule';

export default class DefaultModule extends BaseStoreModule {
  getters = {}

  actions = {
    ...BaseTableModule.getActions(),
    ...BaseOpenedInstanceModule.getActions(),

    ADD_ITEM: async (context) => {
      if (!context.state.itemId) {
        const id = await context.dispatch('POST_ITEM');
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
    RESET_ITEM_STATE: (context) => {
      context.commit('RESET_ITEM_STATE');
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
