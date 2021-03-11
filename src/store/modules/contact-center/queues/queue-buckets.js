import QueueBucketsAPI from '../../../../api/contact-center/queues/queueBuckets';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const resettableItemState = {
  itemInstance: {
    bucket: '',
    ratio: 0,
  },
};

const queueBuckets = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(QueueBucketsAPI)
  .generateAPIActions()
  .getModule();

export default queueBuckets;
