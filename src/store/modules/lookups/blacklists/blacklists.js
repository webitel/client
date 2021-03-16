import BlacklistsAPI from '../../../../api/lookups/blacklists/blacklists';
import numbers from './blacklistNumbers';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import DefaultPermissionsModule from '../../../BaseModules/defaults/DefaultPermissionsModule';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
  },
};

const actions = {
  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('lookups/blacklists/numbers/RESET_STATE', {}, { root: true });
  },
};

const PERMISSIONS_API_URL = '/call_center/list';
const permissions = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const blacklists = new DefaultModule(resettableState)
  .attachAPIModule(BlacklistsAPI)
  .generateAPIActions()
  .setChildModules({ numbers, permissions })
  .getModule({ actions });

export default blacklists;
