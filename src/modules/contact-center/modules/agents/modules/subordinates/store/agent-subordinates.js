import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import AgentSubordinatesAPI from '../api/agentSubordinates';
import headers from './_internals/headers';

const resettableItemState = {
	itemInstance: {
		agent: {},
	},
};

const agentSubordinates = new NestedObjectStoreModule({
	resettableItemState,
	headers,
})
	.attachAPIModule(AgentSubordinatesAPI)
	.generateAPIActions()
	.getModule();

export default agentSubordinates;
