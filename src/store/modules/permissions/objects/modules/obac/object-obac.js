import DefaultPermissionsModule from '../../../../../BaseModules/defaults/DefaultPermissionsModule';

const PERMISSIONS_API_URL = '/objclass';
const defaultModule = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

export default defaultModule;
