import CognitiveProfilesAPI from '../api/cognitiveProfiles';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    default: false,
    enabled: true,
    provider: {},
    service: {},
    description: '',
  },
};

const skills = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(CognitiveProfilesAPI)
  .generateAPIActions()
  .getModule();

export default skills;
