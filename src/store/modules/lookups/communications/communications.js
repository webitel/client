import CommunicationsAPI from '../../../../api/lookups/communications/communications';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';

const resettableState = {
  itemInstance: {
    name: '',
    code: '',
    description: '',
  },
};

const communications = new DefaultModule(resettableState)
  .attachAPIModule(CommunicationsAPI)
  .generateAPIActions()
  .getModule();

export default communications;
