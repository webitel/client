import SkillsAPI from '../../../../api/lookups/agentSkills/agentSkills';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
  },
};

const skills = new DefaultModule(resettableState)
  .attachAPIModule(SkillsAPI)
  .generateAPIActions()
  .getModule();

export default skills;
