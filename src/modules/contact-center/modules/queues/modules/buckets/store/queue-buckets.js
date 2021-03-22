import QueueBucketsAPI from '../api/queueBuckets';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

const resettableItemState = {
  itemInstance: {
    bucket: '',
    ratio: 0,
  },
};

const queueBuckets = new NestedObjectStoreModule({ resettableItemState })
  .attachAPIModule(QueueBucketsAPI)
  .generateAPIActions()
  .getModule();

export default queueBuckets;
