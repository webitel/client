import FlowAPI from '../api/flow';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    schema: '[]',
    payload: {},
  },
};

const flow = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(FlowAPI)
  .generateAPIActions()
  .getModule();

export default flow;
