import {
  addTeamAgent,
  deleteTeamAgent,
  getTeamAgent,
  getTeamAgentsList,
  updateTeamAgent,
} from '../../../../api/contact-center/teams/teamAgents';
import { DefaultNestedModule } from '../../defaults/DefaultNestedModule';

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    agent: {},
    lvl: 0,
    buckets: [],
  },
});

const defaultNestedModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultNestedModule.state,
};

const getters = {
  GET_ITEM_BUCKETS: (state) => (id) => {
    const item = state.dataList.find((item) => item.id === id);
    return item.buckets;
  },
};

const actions = {
  GET_LIST: (context) => {
    return getTeamAgentsList(context.state.parentId, context.state.page, context.state.size, context.state.search);
  },

  GET_ITEM: (context) => {
    return getTeamAgent(context.state.parentId, context.state.itemId);
  },

  POST_ITEM: (context) => {
    return addTeamAgent(context.state.parentId, context.state.itemInstance);
  },

  UPD_ITEM: (context) => {
    return updateTeamAgent(context.state.parentId, context.state.itemId, context.state.itemInstance);
  },

  DELETE_ITEM: (context, id) => {
    return deleteTeamAgent(context.state.parentId, id);
  },

  ...defaultNestedModule.actions,
};

const mutations = {
  ...defaultNestedModule.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
