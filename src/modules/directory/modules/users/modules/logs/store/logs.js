import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import LogsAPI from '../api/logs';
import filters from '../modules/filters/store/filters';
import headers from './_internals/headers';

const logs = new NestedObjectStoreModule({
	headers,
})
	.attachAPIModule(LogsAPI)
	.generateAPIActions()
	.setChildModules({
		filters,
	})
	.getModule();

export default logs;
