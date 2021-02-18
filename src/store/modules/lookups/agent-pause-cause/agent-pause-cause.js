import { DefaultModule } from '../../defaults/DefaultModule';
import PauseCauseAPI from '../../../../api/lookups/agentPauseCause/agentPauseCause';

const defaultState = () => ({
  itemId: 0,
  itemInstance: {
    name: '',
    limitMin: 60,
    allowAdmin: true,
    allowSupervisor: true,
    allowAgent: true,
    description: '',
  },
});

const defaultModule = new DefaultModule(defaultState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,
  GET_LIST: (context) => {
    return PauseCauseAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return PauseCauseAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return PauseCauseAPI.add(context.state);
  },
  PATCH_ITEM: (context, { id, changes }) => {
    return PauseCauseAPI.patch({ id, changes });
  },
  UPD_ITEM: (context) => {
    return PauseCauseAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return PauseCauseAPI.delete({ id });
  },
  CHANGE_ADMIN_PERMISSIONS: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'allowAdmin', ...payload }),
  CHANGE_SUPERVISOR_PERMISSIONS: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'allowSupervisor', ...payload }),
  CHANGE_AGENT_PERMISSIONS: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'allowAgent', ...payload }),
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
