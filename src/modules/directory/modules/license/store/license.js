import LicenseAPI from '../api/license';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';
import users from '../modules/users/store/users';

const actions = {
  UPD_ITEM: (context, certificate) => LicenseAPI.update(certificate),
  UPDATE_ITEM: async (context, payload) => {
    await context.dispatch('UPD_ITEM', payload);
    context.dispatch('LOAD_DATA_LIST');
  },
};

const license = new ObjectStoreModule({ headers })
  .attachAPIModule(LicenseAPI)
  .generateAPIActions()
  .setChildModules({ users })
  .getModule({ actions });

export default license;
