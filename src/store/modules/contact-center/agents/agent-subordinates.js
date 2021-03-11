import AgentSubordinatesAPI from '../../../../api/contact-center/agents/agentSubordinates';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const resettableItemState = {
  itemInstance: {
    agent: {},
  },
};

const getters = {
  GET_SUBORDINATE_SKILLS: (state) => (subordinateId) => {
    const subordinate = state.dataList.find((subordinate) => subordinate.id === subordinateId);
    return subordinate.skills;
  },
};

const agentSubordinates = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(AgentSubordinatesAPI)
  .generateAPIActions()
  .getModule({ getters });

export default agentSubordinates;
