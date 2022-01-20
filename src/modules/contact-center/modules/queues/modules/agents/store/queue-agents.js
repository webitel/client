import QueueAgentsAPI from '../api/queueAgents';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const queueAgents = new NestedObjectStoreModule({ headers })
  .attachAPIModule(QueueAgentsAPI)
  .generateAPIActions()
  .getModule();

export default queueAgents;
