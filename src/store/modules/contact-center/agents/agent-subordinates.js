import AgentSubordinatesAPI from '../../../../api/contact-center/agents/agentSubordinates';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    agent: {},
  },
});
const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultModule.state,
};

const getters = {
  GET_SUBORDINATE_SKILLS: (state) => (subordinateId) => {
    const subordinate = state.dataList.find((subordinate) => subordinate.id === subordinateId);
    return subordinate.skills;
  },
};

const actions = {
  ...defaultModule.actions,
  GET_LIST: (context) => {
    return AgentSubordinatesAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return AgentSubordinatesAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return AgentSubordinatesAPI.add(context.state);
  },
  UPD_ITEM: (context) => {
    return AgentSubordinatesAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return AgentSubordinatesAPI.delete({ parentId: context.state.parentId, id });
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
