import numbers from './resource-display';
import ResourcesAPI from '../../../../api/contact-center/resources/resources';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import DefaultPermissionsModule from '../../../BaseModules/defaults/DefaultPermissionsModule';

const resettableState = {
  itemInstance: {
    name: '',
    gateway: {},
    cps: 10,
    limit: 10,
    description: '',
    maxErrors: 2,
    errorIds: [],
  },
};

const actions = {
  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('ccenter/res/numbers/RESET_STATE', {}, { root: true });
  },
};

const PERMISSIONS_API_URL = '/call_center/resources';
const permissions = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const resources = new DefaultModule(resettableState)
  .attachAPIModule(ResourcesAPI)
  .generateAPIActions()
  .setChildModules({ numbers, permissions })
  .getModule({ actions });

export default resources;
