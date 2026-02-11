import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import ChatplanAPI from '../api/chatplan';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		schema: {},
		description: '',
		enabled: true,
	},
};

const chatplan = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(ChatplanAPI)
	.generateAPIActions()
	.getModule();

export default chatplan;
