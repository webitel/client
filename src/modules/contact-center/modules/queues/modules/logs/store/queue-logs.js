import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import QueueLogsAPI from '../api/queueLog';
import headers from './_internals/headers';

const queueLogs = new NestedObjectStoreModule({ headers })
  .attachAPIModule(QueueLogsAPI)
  .generateAPIActions()
  .getModule();

export default queueLogs;
