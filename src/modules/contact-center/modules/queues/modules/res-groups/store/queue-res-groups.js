import QueueResGroupsAPI from '../api/queueResGroups';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

const resettableItemState = {
  itemInstance: {
    resourceGroup: {},
  },
};

const queueResGroups = new NestedObjectStoreModule({ resettableItemState })
  .attachAPIModule(QueueResGroupsAPI)
  .generateAPIActions()
  .getModule();

export default queueResGroups;

