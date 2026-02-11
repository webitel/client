import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import QueueLogsAPI from '../api/queueLog';
import filters from '../modules/filters/store/filters';
import headers from './_internals/headers';

const queueLogs = new NestedObjectStoreModule({
	headers,
})
	.attachAPIModule(QueueLogsAPI)
	.generateAPIActions()
	.setChildModules({
		filters,
	})
	.getModule();

export default queueLogs;
