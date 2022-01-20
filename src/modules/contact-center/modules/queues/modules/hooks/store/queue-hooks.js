import QueueHooksAPI from '../api/queueHooks';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    event: '',
    properties: [],
    schema: {},
    enabled: true,
  },
};

const queueHooks = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(QueueHooksAPI)
  .generateAPIActions()
  .getModule();

export default queueHooks;
