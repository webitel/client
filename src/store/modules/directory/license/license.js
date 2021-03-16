import LicenseAPI from '../../../../api/directory/license/license';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';

const actions = {
  UPD_ITEM: (context, certificate) => LicenseAPI.update(certificate),
  UPDATE_ITEM: async (context, payload) => {
    await context.dispatch('UPD_ITEM', payload);
    context.dispatch('LOAD_DATA_LIST');
  },
};

const license = new DefaultModule()
  .attachAPIModule(LicenseAPI)
  .generateAPIActions()
  .getModule({ actions });

export default license;
