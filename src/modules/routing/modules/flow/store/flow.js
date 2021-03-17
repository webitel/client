import FlowAPI from '../components/flow';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';

const resettableState = {
  itemInstance: {
    name: '',
    schema: '[]',
  },
};

const flow = new ObjectStoreModule(resettableState)
  .attachAPIModule(FlowAPI)
  .generateAPIActions()
  .getModule();

export default flow;
