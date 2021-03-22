import QueueBucketsAPI from '../api/queueBuckets';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    bucket: '',
    ratio: 0,
  },
};

const queueBuckets = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(QueueBucketsAPI)
  .generateAPIActions()
  .getModule();

export default queueBuckets;
