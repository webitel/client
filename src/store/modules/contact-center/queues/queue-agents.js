import QueueAgentsAPI from '../../../../api/contact-center/queues/queueAgents';
import { DefaultNestedModule } from '../../defaults/DefaultNestedModule';

const defaultItemState = () => ({
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
    return QueueAgentsAPI.getList(context.state);
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
