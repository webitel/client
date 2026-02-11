import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import QueueAgentsAPI from '../api/queueAgents';
import headers from './_internals/headers';

const queueAgents = new NestedObjectStoreModule({
	headers,
})
	.attachAPIModule(QueueAgentsAPI)
	.generateAPIActions()
	.getModule();

export default queueAgents;
