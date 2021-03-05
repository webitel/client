import DialplanAPI from '../../../../api/routing/dialplan/dialplan';
import { DefaultModule } from '../../defaults/DefaultModule';

const defaultState = () => ({
  itemId: 0,
  itemInstance: {
    name: '',
    schema: {},
    pattern: '',
    description: '',
  },
});

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,
  GET_LIST: (context) => {
    return DialplanAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return DialplanAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return DialplanAPI.add(context.state);
  },
  PATCH_ITEM: (context, { id, changes }) => {
    return DialplanAPI.patch({ id, changes });
  },
  UPD_ITEM: (context) => {
    return DialplanAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return DialplanAPI.delete({ id });
  },
  SWAP_ROWS: async (context, { fromId, toId }) => {
    /*
    UI swap commented
    because sortable reinitialization triggers on each dataList change
    but UI changes anyway
    await context.commit('SWAP_ROWS', {fromId, toId});
    */
    try {
      await DialplanAPI.moveDialplan({ fromId, toId });
    } catch {
    } finally {
      context.dispatch('LOAD_DATA_LIST');
    }
  },
};

const mutations = {
  ...defaultModule.mutations,
  SWAP_ROWS: (state, { fromId, toId }) => {
    const fromIndex = state.dataList.findIndex(item => item.id === fromId);
    const toIndex = state.dataList.findIndex(item => item.id === toId);
    const buffer = state.dataList[fromIndex];
    state.dataList.splice(fromIndex, 1, state.dataList[toIndex]);
    state.dataList.splice(toIndex, 1, buffer);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
