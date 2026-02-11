import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import QuickRepliesAPI from '../api/quickReplies';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		teams: [],
		queues: [],
		text: '',
	},
};

const quickReplies = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(QuickRepliesAPI)
	.generateAPIActions()
	.getModule();

export default quickReplies;
