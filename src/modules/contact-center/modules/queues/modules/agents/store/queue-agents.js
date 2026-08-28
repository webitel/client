import { QueueAgentsAPI } from '@webitel/api-services/api';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const queueAgents = new NestedObjectStoreModule({
	headers,
})
	.attachAPIModule(QueueAgentsAPI)
	.generateAPIActions()
	.getModule();

export default queueAgents;
