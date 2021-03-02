import { DefaultPermissionsModule } from '../../../../defaults/DefaultPermissionsModule';
import {
  getObjectPermissions,
  patchObjectPermissions,
} from '../../../../../../api/permissions/objects/objects';

const defaultState = () => ({});
const defaultModule = new DefaultPermissionsModule();

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,
  GET_LIST: (context) => getObjectPermissions(context.state),
  PATCH_ACCESS_MODE: (context, { changes }) => patchObjectPermissions(context.state.parentId, [changes]),

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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
