import FlowAPI from '../api/flow';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    schema: '[]',
    payload: {},
    type: '',
    editor: false,
  },
};

const state = {
  fields: ['id'].concat(headers.map((header) => header.field)),
};

const flow = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(FlowAPI)
  .generateAPIActions()
  .getModule({ state });

export default flow;
