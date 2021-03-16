import QueueAgentsAPI from '../../../../api/contact-center/queues/queueAgents';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const getters = {
  GET_ITEM_SKILLS: (state) => (id) => {
    const item = state.dataList.find((item) => item.id === id);
    return item.skills;
  },
};

const actions = {
  GET_LIST: (context) => {
    return QueueAgentsAPI.getList(context.state);
  },
};

const queueAgents = new DefaultNestedModule()
  .getModule({ getters, actions });

export default queueAgents;
