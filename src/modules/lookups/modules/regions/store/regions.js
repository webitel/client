import RegionsAPI from '../api/regions';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';

const resettableState = {
  itemInstance: {
    name: '',
    timezone: {},
    description: '',
  },
};

const regions = new ObjectStoreModule({ resettableState })
  .attachAPIModule(RegionsAPI)
  .generateAPIActions()
  .getModule();

export default regions;
