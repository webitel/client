import deepCopy from 'deep-copy';
import BaseStoreModule from '../BaseStoreModule';
import BaseTableModule from '../StoreModuleMixins/BaseTableStoreModuleMixin';
import BaseOpenedInstanceModule from '../StoreModuleMixins/BaseOpenedInstanceStoreModuleMixin';

const DEFAULT_STATE = BaseTableModule.generateState();
const DEFAULT_ITEM_STATE = BaseOpenedInstanceModule.generateState();

export default class NestedObjectStoreModule extends BaseStoreModule {
  actions = {
    ...BaseTableModule.getActions(),
    ...BaseOpenedInstanceModule.getActions(),

    // FIXME TRY TO DELETE )))
    // SET_ITEM_ID: (context, id) => {
    //   if (id !== 'new') context.commit('SET_ITEM_ID', id);
    // },
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
    RESET_STATE: (context) => {
      context.commit('RESET_STATE');
    },
  };

  mutations = {
    ...BaseTableModule.getMutations(),
    ...BaseOpenedInstanceModule.getMutations(),

    RESET_STATE: (state) => {
      Object.assign(state, this._resettableState(), this._resettableItemState());
    },
    RESET_ITEM_STATE: (state) => {
      Object.assign(state, this._resettableItemState());
    },
  };

  constructor(resettableState, resettableItemState) {
    super();
    const state = { parentId: 0 };
    this._resettableState = () => deepCopy({ ...DEFAULT_STATE, ...resettableState });
    this._resettableItemState = () => deepCopy({ ...DEFAULT_ITEM_STATE, ...resettableItemState });
    this.state = { ...state, ...this._resettableState(), ...this._resettableItemState() };
  }
}
