import QueueResGroupsAPI from '../../../../api/contact-center/queues/queueResGroups';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const resettableItemState = {
  itemInstance: {
    resourceGroup: {},
  },
};

const queueResGroups = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(QueueResGroupsAPI)
  .generateAPIActions()
  .getModule();

export default queueResGroups;

