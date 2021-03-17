import SkillsAPI from '../api/agentSkills';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
  },
};

const skills = new ObjectStoreModule(resettableState)
  .attachAPIModule(SkillsAPI)
  .generateAPIActions()
  .getModule();

export default skills;
