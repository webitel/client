import TeamAgentsAPI from '../api/teamAgents';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    agent: {},
  },
};

const teamAgents = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(TeamAgentsAPI)
  .generateAPIActions()
  .getModule();

export default teamAgents;
