import DefaultPermissionsModule from '../../../../defaults/DefaultPermissionsModule';

const PERMISSIONS_API_URL = '/objclass';
const defaultModule = new DefaultPermissionsModule()
  .generateAPIMethods(PERMISSIONS_API_URL)
  .getModule();

export default defaultModule;
