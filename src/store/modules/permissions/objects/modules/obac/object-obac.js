import { DefaultModule } from '../../../../defaults/DefaultModule';
import BaseObjectAccessControl from '../BaseObjectAccessControl';

import {
  getObjectPermissions,
  patchObjectPermissions,
} from '../../../../../../api/permissions/objects/objects';

const defaultState = () => ({});
const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {
  ...BaseObjectAccessControl.getters,
};

const actions = {
  ...defaultModule.actions,
  ...BaseObjectAccessControl.actions,
  GET_LIST: (context) => getObjectPermissions({
    id: context.getters.OBJECT_ID,
    page: context.state.page,
    size: context.state.size,
    search: context.state.search,
  }),
  PATCH_ACCESS_MODE: (context, { changes }) => patchObjectPermissions(context.getters.OBJECT_ID, [changes]),

  ADD_ROLE_PERMISSIONS: async (context, role) => {
    const changes = {
      grantee: +role.id,
      grants: 'r',
    };
    try {
      await context.dispatch('PATCH_ACCESS_MODE', { changes });
    } catch (err) {
      throw err;
    } finally {
      context.dispatch('LOAD_DATA_LIST');
    }
  },
};

const mutations = {
  ...defaultModule.mutations,
  ...BaseObjectAccessControl.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
