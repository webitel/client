import FlowAPI from '../api/flow';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    schema: '[]',
    payload: {},
    editor: false,
  },
};

const state = {
  fields: ['id'].concat(headers.map((header) => header.field)),
};
const actions = {
  SET_EDITOR: (context) => {
    context.commit('SET_EDITOR');
  },
};

const mutations = {
  SET_EDITOR: (state) => {
    state.itemInstance.editor = true;
  },
};

const flow = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(FlowAPI)
  .generateAPIActions()
  .getModule({ state, actions, mutations });

export default flow;
