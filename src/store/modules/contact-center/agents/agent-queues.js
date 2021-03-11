import AgentsAPI from '../../../../api/contact-center/agents/agents';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const actions = {
  GET_LIST: (context) => {
    return AgentsAPI.getAgentsInQueue(context.state);
  },
};

const agentQueues = new DefaultNestedModule()
  .getModule({ actions });

export default agentQueues;
