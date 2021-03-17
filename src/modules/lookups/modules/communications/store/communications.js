import CommunicationsAPI from '../api/communications';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';

const resettableState = {
  itemInstance: {
    name: '',
    code: '',
    description: '',
  },
};

const communications = new ObjectStoreModule(resettableState)
  .attachAPIModule(CommunicationsAPI)
  .generateAPIActions()
  .getModule();

export default communications;
