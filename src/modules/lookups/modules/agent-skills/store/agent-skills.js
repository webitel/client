import SkillsAPI from '../api/agentSkills';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';
import agents from '../modules/agents/store/skill-agents';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
  },
};

const skills = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(SkillsAPI)
  .generateAPIActions()
  .setChildModules({ agents })
  .getModule();

export default skills;
