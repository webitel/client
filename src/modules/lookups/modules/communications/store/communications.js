import CommunicationsAPI from '../api/communications';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    code: '',
    description: '',
    channel: '',
  },
};

const communications = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(CommunicationsAPI)
  .generateAPIActions()
  .getModule();

export default communications;
