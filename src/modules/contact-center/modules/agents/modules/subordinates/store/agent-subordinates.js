import AgentSubordinatesAPI from '../api/agentSubordinates';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

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

const agentSubordinates = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(AgentSubordinatesAPI)
  .generateAPIActions()
  .getModule({ getters });

export default agentSubordinates;
