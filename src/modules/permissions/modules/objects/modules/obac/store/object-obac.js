import PermissionsStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';

const PERMISSIONS_API_URL = '/objclass';
const defaultModule = new PermissionsStoreModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

export default defaultModule;
