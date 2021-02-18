import { DefaultModule } from '../../../../defaults/DefaultModule';
import BaseObjectAccessControl from '../BaseObjectAccessControl';
import {
  fetchObjclassDefaultList,
  toggleObjclassDefaultMode,
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
  GET_LIST: (context) => fetchObjclassDefaultList({
    id: context.getters.OBJECT_ID,
    page: context.state.page,
    size: context.state.size,
    search: context.state.search,
  }),
  PATCH_ACCESS_MODE: (context, {
    item,
    changes,
  }) => toggleObjclassDefaultMode(context.getters.OBJECT_ID, +item.grantor.id, changes),

  ADD_DEFAULT_ITEM_ROLE: async (context, { grantee, grantor }) => {
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
  ...BaseObjectAccessControl.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
