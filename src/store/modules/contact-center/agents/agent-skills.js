import AgentSkillAPI from '../../../../api/contact-center/agents/agentSkills';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const resettableItemState = {
  itemInstance: {
    skill: '',
    capacity: 10,
    enabled: true,
  },
};

const agentSkills = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(AgentSkillAPI)
  .generateAPIActions()
  .getModule();

export default agentSkills;
