import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import RegionsAPI from '../api/regions';
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
