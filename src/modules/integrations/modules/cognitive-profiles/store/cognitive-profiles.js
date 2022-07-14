import { StorageProviderType } from 'webitel-sdk';
import { MicrosoftLanguage } from 'webitel-sdk/esm2015/enums';
import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import MicrosoftRegions
  from '../../../lookups/microsoft/MicrosoftRegions.lookup';
import CognitiveProfilesAPI from '../api/cognitiveProfiles';
import CognitiveProfileServices
  from '../lookups/CognitiveProfileServices.lookup';
import headers from './_internals/headers';

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
      locale: MicrosoftLanguage['en-US'],
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
    return context.dispatch('SET_ITEM_PROPERTY', {
      prop: 'properties',
      value: properties,
    });
  },
};

const PERMISSIONS_API_URL = '/storage/cognitive_profiles';
const permissions = new PermissionsStoreModule()
.generateAPIActions(PERMISSIONS_API_URL)
.getModule();

const skills = new ObjectStoreModule({ resettableState, headers })
.attachAPIModule(CognitiveProfilesAPI)
.generateAPIActions()
.setChildModules({ permissions })
.getModule({ actions });

export default skills;
