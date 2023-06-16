import skillAgentsAPI from '../api/skillAgents';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    agent: {},
  },
};

const skillAgents = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(skillAgentsAPI)
  .generateAPIActions()
  .getModule();

export default skillAgents;
