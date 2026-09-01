import { RegionsAPI } from '@webitel/api-services/api';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const resettableState = {
	itemInstance: {
		name: '',
		timezone: {},
		description: '',
	},
};

const regions = new ObjectStoreModule({
	resettableState,
	headers,
})
	.attachAPIModule(RegionsAPI)
	.generateAPIActions()
	.getModule();

export default regions;
