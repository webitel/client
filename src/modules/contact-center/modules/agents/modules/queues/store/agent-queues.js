import AgentsAPI from '../../../api/agents';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

const actions = {
  GET_LIST: (context) => {
    return AgentsAPI.getAgentsInQueue(context.state);
  },
};

const agentQueues = new NestedObjectStoreModule()
  .getModule({ actions });

export default agentQueues;
