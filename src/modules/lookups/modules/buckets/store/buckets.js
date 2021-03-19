import BucketsAPI from '../api/buckets';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
  },
};

const PERMISSIONS_API_URL = '/call_center/buckets';
const permissions = new PermissionsStoreModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const buckets = new ObjectStoreModule({ resettableState })
  .attachAPIModule(BucketsAPI)
  .generateAPIActions()
  .setChildModules({ permissions })
  .getModule();

export default buckets;
