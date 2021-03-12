import deepMerge from 'deepmerge';
import history from './history';
import DevicesAPI from '../../../../api/directory/devices/devices';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import DefaultPermissionsModule from '../../../BaseModules/defaults/DefaultPermissionsModule';
import proxy from '../../../../utils/editProxy';
import defaultDevice from './_internals/deviceSchema/defaults/defaultDevice';
import hotdeskDevice from './_internals/deviceSchema/hotdeskDevice';

const resettableState = {
  itemInstance: defaultDevice(),
};

const actions = {
  LOAD_ITEM: async (context, isHotdesk) => {
    if (context.state.itemId) {
      const item = await context.dispatch('GET_ITEM');
      context.dispatch('SET_TYPED_ITEM', { item, isHotdesk });
    } else {
      context.dispatch('SET_TYPED_ITEM', { isHotdesk });
    }
  },
  SET_TYPED_ITEM: (context, { isHotdesk, item = {} }) => {
    if (isHotdesk) {
      item = deepMerge(hotdeskDevice(), item);
    } else {
      item = deepMerge(defaultDevice(), item);
    }
    context.commit('SET_ITEM', proxy(item));
  },
};

const PERMISSIONS_API_URL = '/devices';
const permissions = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const devices = new DefaultModule(resettableState)
  .attachAPIModule(DevicesAPI)
  .generateAPIActions()
  .setChildModules({ history, permissions })
  .getModule({ actions });

export default devices;
