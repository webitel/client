import AgentSkillAPI from '../api/agentSkills';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

const resettableItemState = {
  itemInstance: {
    skill: '',
    capacity: 10,
    enabled: true,
  },
};

const agentSkills = new NestedObjectStoreModule(null, resettableItemState)
  .attachAPIModule(AgentSkillAPI)
  .generateAPIActions()
  .getModule();

export default agentSkills;
