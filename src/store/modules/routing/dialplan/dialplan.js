import DialplanAPI from '../../../../api/routing/dialplan/dialplan';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';

const resettableState = {
  itemInstance: {
    name: '',
    schema: {},
    pattern: '',
    description: '',
  },
};

const actions = {
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
      // context.dispatch('LOAD_DATA_LIST');
    }
  },
};

const mutations = {
  SWAP_ROWS: (state, { fromId, toId }) => {
    const fromIndex = state.dataList.findIndex(item => item.id === fromId);
    const toIndex = state.dataList.findIndex(item => item.id === toId);
    const buffer = state.dataList[fromIndex];
    state.dataList.splice(fromIndex, 1, state.dataList[toIndex]);
    state.dataList.splice(toIndex, 1, buffer);
  },
};

const dialplan = new DefaultModule(resettableState)
  .attachAPIModule(DialplanAPI)
  .generateAPIActions()
  .getModule({ actions, mutations });

export default dialplan;
