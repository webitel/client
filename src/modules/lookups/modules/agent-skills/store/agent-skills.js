import SkillsAPI from '../api/agentSkills';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
  },
};

const skills = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(SkillsAPI)
  .generateAPIActions()
  .getModule();

export default skills;
