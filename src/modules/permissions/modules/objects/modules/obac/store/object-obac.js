import PermissionsStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import headers from './_internals/headers';

const PERMISSIONS_API_URL = '/objclass';
const defaultModule = new PermissionsStoreModule({
	headers,
})
	.generateAPIActions(PERMISSIONS_API_URL)
	.getModule();

export default defaultModule;
