import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import CommunicationsAPI from '../api/communications';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		code: '',
		description: '',
		channel: '',
		default: false,
	},
};

const communications = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(CommunicationsAPI)
	.generateAPIActions()
	.getModule();

export default communications;
