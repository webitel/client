import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import TeamHooksAPI from '../api/teamHooks';
import headers from './_internals/headers';

const resettableItemState = {
	itemInstance: {
		event: '',
		properties: [],
		schema: {},
		enabled: true,
	},
};

const teamHooks = new NestedObjectStoreModule({
	resettableItemState,
	headers,
})
	.attachAPIModule(TeamHooksAPI)
	.generateAPIActions()
	.getModule();

export default teamHooks;
