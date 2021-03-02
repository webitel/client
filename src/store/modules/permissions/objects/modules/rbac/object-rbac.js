import { DefaultPermissionsModule } from '../../../../defaults/DefaultPermissionsModule';
import {
  fetchObjclassDefaultList,
  toggleObjclassDefaultMode,
} from '../../../../../../api/permissions/objects/objects';

const defaultModule = new DefaultPermissionsModule();

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,
  GET_LIST: (context) => fetchObjclassDefaultList(context.state),
  PATCH_ACCESS_MODE: (context, { item, changes }) => (
    toggleObjclassDefaultMode(context.state.parentId, +item.grantor.id, changes)
  ),

  ADD_ROLE_PERMISSIONS: async (context, { grantee, grantor }) => {
    const changes = {
      grantor: +grantor.id,
      grantee: +grantee.id,
      granted: 'r',
    };
    const item = { grantor, grantee };
    try {
      await context.dispatch('PATCH_ACCESS_MODE', { item, changes });
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
