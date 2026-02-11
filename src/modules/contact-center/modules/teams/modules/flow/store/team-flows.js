import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import TeamFlowsAPI from '../api/teamFlows';
import headers from './_internals/headers';

const resettableItemState = {
	itemInstance: {
		name: '',
		description: '',
		enabled: true,
		schema: {},
	},
};

const teamFlows = new NestedObjectStoreModule({
	resettableItemState,
	headers,
})
	.attachAPIModule(TeamFlowsAPI)
	.generateAPIActions()
	.getModule();

export default teamFlows;
