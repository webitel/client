import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';
import QueueLogsAPI from '../../../../api/contact-center/queues/queueLog';

const queueLogs = new DefaultNestedModule()
  .attachAPIModule(QueueLogsAPI)
  .generateAPIActions()
  .getModule();

export default queueLogs;
