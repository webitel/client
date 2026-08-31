import { UserLogsAPI as LogsAPI } from '@webitel/api-services/api';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
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
