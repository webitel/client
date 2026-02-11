import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import ResInGroupAPI from '../api/resInGroup';
import headers from './_internals/headers';

const resettableItemState = {
	itemInstance: {
		resource: {},
		reserveResource: {},
		priority: 0,
	},
};

const resInGroup = new NestedObjectStoreModule({
	resettableItemState,
	headers,
})
	.attachAPIModule(ResInGroupAPI)
	.generateAPIActions()
	.getModule();

export default resInGroup;
