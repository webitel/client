import AgentSubordinatesAPI from '../api/agentSubordinates';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

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

const agentSubordinates = new NestedObjectStoreModule(null, resettableItemState)
  .attachAPIModule(AgentSubordinatesAPI)
  .generateAPIActions()
  .getModule({ getters });

export default agentSubordinates;
