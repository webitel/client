import { TriggerJobsAPI as TriggersLogAPI } from '@webitel/api-services/api';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import filters from '../modules/filters/store/filters';
import headers from './_internals/headers';

const triggerLogs = new NestedObjectStoreModule({
	headers,
})
	.attachAPIModule(TriggersLogAPI)
	.generateAPIActions()
	.setChildModules({
		filters,
	})
	.getModule();

export default triggerLogs;
