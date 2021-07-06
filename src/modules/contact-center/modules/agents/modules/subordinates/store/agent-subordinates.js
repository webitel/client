import NestedObjectStoreModule
  from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import AgentSubordinatesAPI from '../api/agentSubordinates';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    agent: {},
  },
};

const getters = {
  GET_SUBORDINATE_BY_ID: (state) => (subordinateId) => (
    state.dataList.find((subordinate) => subordinate.id === subordinateId)
  ),
  GET_SUBORDINATE_SUPERVISORS: (state, getters) => (subordinateId) => (
    getters.GET_SUBORDINATE_BY_ID(subordinateId).supervisor
  ),
  GET_SUBORDINATE_SKILLS: (state, getters) => (subordinateId) => (
    getters.GET_SUBORDINATE_BY_ID(subordinateId).skills
  ),
};

const agentSubordinates = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(AgentSubordinatesAPI)
  .generateAPIActions()
  .getModule({ getters });

export default agentSubordinates;
