import { StorageProviderType } from 'webitel-sdk';
import MicrosoftRegions
  from '../../../lookups/microsoft/MicrosoftRegions.lookup';
import CognitiveProfilesAPI from '../api/cognitiveProfiles';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';
import CognitiveProfileServices
  from '../lookups/CognitiveProfileServices.lookup';

const resettableState = {
  itemInstance: {
    name: '',
    default: false,
    enabled: true,
    provider: StorageProviderType.Microsoft,
    service: CognitiveProfileServices[0],
    properties: {
      key: '',
      region: MicrosoftRegions[0],
    },
    description: '',
  },
};

const actions = {
  SET_ITEM_PROPERTIES_PROP: (context, { prop, value }) => {
    const properties = {
      ...context.state.itemInstance.properties,
    [prop]: value,
    };
    return context.dispatch('SET_ITEM_PROPERTY', { prop: 'properties', value: properties });
  },
};

const skills = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(CognitiveProfilesAPI)
  .generateAPIActions()
  .getModule({ actions });

export default skills;
