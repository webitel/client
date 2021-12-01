import LicenseUsersAPI from '../api/licenseUsers';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const state = {
  // fields: ['id', 'name', 'license'],
};

const actions = {
};

const license = new NestedObjectStoreModule({ headers })
  .attachAPIModule(LicenseUsersAPI)
  .generateAPIActions()
  .getModule({ state, actions });

export default license;
