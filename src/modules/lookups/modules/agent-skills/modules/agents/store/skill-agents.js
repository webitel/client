import AgentSkillAPI from '../api/skillAgents';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    skill: {},
    team: {},
    capacity: 10,
    enabled: false,
  },
};

const agentSkills = new NestedObjectStoreModule({ resettableItemState, headers })
.attachAPIModule(AgentSkillAPI)
.generateAPIActions()
.getModule();

export default agentSkills;
