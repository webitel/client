import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import AgentQueuesAPI from '../api/agentQueues';
import headers from './_internals/headers';

const agentQueues = new NestedObjectStoreModule({
	headers,
})
	.attachAPIModule(AgentQueuesAPI)
	.generateAPIActions()
	.getModule();

export default agentQueues;
