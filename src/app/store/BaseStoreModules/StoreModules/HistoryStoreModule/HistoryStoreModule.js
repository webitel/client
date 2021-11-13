import BaseStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';
import BaseTableModule from '../../StoreModuleMixins/BaseTableStoreModuleMixin';
import BaseOpenedInstanceModule from '../../StoreModuleMixins/BaseOpenedInstanceStoreModuleMixin';

export class HistoryStoreModule extends BaseStoreModule {
  _resettableState = () => ({
    ...BaseTableModule.generateState(),
    parentId: 0,
    from: new Date().setHours(0, 0, 0, 0),
    to: Date.now(),
  });

  state = this._resettableState();

  getters = {};

  actions = {
    ...BaseTableModule.getActions(),
    ...BaseOpenedInstanceModule.getActions(),

    SET_FROM: (context, from) => {
      context.commit('SET_FROM', from);
      context.dispatch('LOAD_DATA_LIST');
    },
    SET_TO: (context, to) => {
      context.commit('SET_TO', to);
      context.dispatch('LOAD_DATA_LIST');
    },
  };

  mutations = {
    ...BaseTableModule.getMutations(),
    ...BaseOpenedInstanceModule.getMutations(),

    SET_FROM: (state, from) => {
      state.from = from;
    },
    SET_TO: (state, to) => {
      state.to = to;
    },
    RESET_ITEM_STATE: (state) => {
      Object.assign(state, this._resettableState());
    },
  };

  generateGetListAction(APIMethod) {
    this.actions.GET_LIST = (context) => APIMethod(context.state);
    return this;
  }
}

export default HistoryStoreModule;
