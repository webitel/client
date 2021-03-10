import RegionsAPI from '../../../../api/lookups/regions/regions';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';

const resettableState = {
  itemInstance: {
    name: '',
    timezone: {},
    description: '',
  },
};

const regions = new DefaultModule(resettableState)
  .attachAPIModule(RegionsAPI)
  .generateAPIActions()
  .getModule();

export default regions;
