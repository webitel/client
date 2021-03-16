import BucketsAPI from '../../../../api/lookups/buckets/buckets';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import DefaultPermissionsModule from '../../../BaseModules/defaults/DefaultPermissionsModule';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
  },
};

const PERMISSIONS_API_URL = '/call_center/buckets';
const permissions = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const buckets = new DefaultModule(resettableState)
  .attachAPIModule(BucketsAPI)
  .generateAPIActions()
  .setChildModules({ permissions })
  .getModule();

export default buckets;
