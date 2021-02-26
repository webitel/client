import TeamAgentsAPI from '../../../../api/contact-center/teams/teamAgents';
import { DefaultNestedModule } from '../../defaults/DefaultNestedModule';

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    agent: {},
  },
});

const defaultNestedModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultNestedModule.state,
};

const getters = {
  GET_ITEM_SKILLS: (state) => (id) => {
    const item = state.dataList.find((item) => item.id === id);
    return item.skills;
  },
};

const actions = {
  ...defaultNestedModule.actions,
  GET_LIST: (context) => {
    return TeamAgentsAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return TeamAgentsAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return TeamAgentsAPI.add(context.state);
  },
  UPD_ITEM: (context) => {
    return TeamAgentsAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return TeamAgentsAPI.delete({ parentId: context.state.parentId, id });
  },
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
