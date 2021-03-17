import LicenseAPI from '../api/license';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';

const actions = {
  UPD_ITEM: (context, certificate) => LicenseAPI.update(certificate),
  UPDATE_ITEM: async (context, payload) => {
    await context.dispatch('UPD_ITEM', payload);
    context.dispatch('LOAD_DATA_LIST');
  },
};

const license = new ObjectStoreModule()
  .attachAPIModule(LicenseAPI)
  .generateAPIActions()
  .getModule({ actions });

export default license;
