import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import QueueBucketsAPI from '../api/queueBuckets';
import headers from './_internals/headers';

const resettableItemState = {
	itemInstance: {
		bucket: '',
		priority: 0,
		disabled: false,
	},
};

const queueBuckets = new NestedObjectStoreModule({
	resettableItemState,
	headers,
})
	.attachAPIModule(QueueBucketsAPI)
	.generateAPIActions()
	.getModule();

export default queueBuckets;
