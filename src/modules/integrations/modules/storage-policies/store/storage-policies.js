import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import StoragePoliciesAPI from '../api/storagePolicies.js';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
    channels: [],
    mimeTypes: [],
    retentionDays: 0,
    speedDownload: '',
    speedUpload: '',
    maxUploadSize: '',
    position: 0,
    enabled: false,
  },
};

const storagePolicies = new ObjectStoreModule({ resettableState, headers })
.attachAPIModule(StoragePoliciesAPI)
.generateAPIActions()
.getModule({});

export default storagePolicies;
