import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import ResDisplayAPI from '../api/resourceDisplay';
import headers from './_internals/headers';

const resettableItemState = {
	itemInstance: {
		display: '',
	},
};

const resDisplay = new NestedObjectStoreModule({
	resettableItemState,
	headers,
})
	.attachAPIModule(ResDisplayAPI)
	.generateAPIActions()
	.getModule();

export default resDisplay;
