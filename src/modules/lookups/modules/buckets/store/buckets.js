import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import BucketsAPI from '../api/buckets';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		description: '',
	},
};

const buckets = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(BucketsAPI)
	.generateAPIActions()
	.getModule();

export default buckets;
