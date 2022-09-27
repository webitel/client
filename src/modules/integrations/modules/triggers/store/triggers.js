import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import TriggersAPI from '../api/triggers';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    description: '',
    enabled: true,
    id: 0,
    name: '',
    schema: {},
    timeout: 60,
    timezone: {},
    type: '',
    variables: [
      { key: '', value: '' },
    ],
  },
};

const triggers = new ObjectStoreModule({ resettableState, headers })
.attachAPIModule(TriggersAPI)
.generateAPIActions()
.getModule({});

export default triggers;
