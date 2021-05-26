import QueueResGroupsAPI from '../api/queueResGroups';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    resourceGroup: {},
  },
};

const queueResGroups = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(QueueResGroupsAPI)
  .generateAPIActions()
  .getModule();

export default queueResGroups;
