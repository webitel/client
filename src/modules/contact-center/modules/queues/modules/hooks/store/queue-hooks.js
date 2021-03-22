import QueueHooksAPI from '../api/queueHooks';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

const resettableItemState = {
  itemInstance: {
    event: '',
    properties: [],
    schema: {},
    enabled: true,
  },
};

const queueHooks = new NestedObjectStoreModule({ resettableItemState })
  .attachAPIModule(QueueHooksAPI)
  .generateAPIActions()
  .getModule();

export default queueHooks;
