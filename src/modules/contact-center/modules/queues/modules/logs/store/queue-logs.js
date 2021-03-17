import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import QueueLogsAPI from '../api/queueLog';

const queueLogs = new NestedObjectStoreModule()
  .attachAPIModule(QueueLogsAPI)
  .generateAPIActions()
  .getModule();

export default queueLogs;
