import numbers from '../modules/display/store/resource-display';
import ResourcesAPI from '../api/resources';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule';
import headers from './_internals/headers';

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
const permissions = new PermissionsStoreModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const resources = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(ResourcesAPI)
  .generateAPIActions()
  .setChildModules({ numbers, permissions })
  .getModule({ actions });

export default resources;
