import deepCopy from 'deep-copy';
import BaseStoreModule from '../bases/BaseStoreModule';
import BaseTableModule from '../bases/BaseTableModule';
import BaseOpenedInstanceModule from '../bases/BaseOpenedInstanceModule';

const DEFAULT_STATE = BaseTableModule.generateState();
const DEFAULT_ITEM_STATE = BaseOpenedInstanceModule.generateState();

export default class DefaultNestedModule extends BaseStoreModule {
  actions = {
    ...BaseTableModule.getActions(),
    ...BaseOpenedInstanceModule.getActions(),

    // FIXME TRY TO DELETE )))
    SET_ITEM_ID: (context, id) => {
      if (id !== 'new') context.commit('SET_ITEM_ID', id);
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
    RESET_STATE: (context) => {
      context.commit('RESET_STATE');
    },
    RESET_ITEM_STATE: (context) => {
      context.commit('RESET_ITEM_STATE');
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
