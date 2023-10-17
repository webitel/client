import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import SingleSignOnAPI from '../api/singleSignOn';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    type: '',
    clientId: '',
    clientSecret: '',
    discoveryUrl: '',
    enabled: true,
    scopes: [],
  },
};

const singleSingOn = new ObjectStoreModule({ resettableState, headers })
.attachAPIModule(SingleSignOnAPI)
.generateAPIActions()
.getModule({});

export default singleSingOn;
