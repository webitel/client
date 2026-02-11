import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import TriggersLogAPI from '../api/triggersLogs';
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
