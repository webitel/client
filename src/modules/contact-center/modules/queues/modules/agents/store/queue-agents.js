import QueueAgentsAPI from '../api/queueAgents';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

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

const queueAgents = new NestedObjectStoreModule()
  .getModule({ getters, actions });

export default queueAgents;
