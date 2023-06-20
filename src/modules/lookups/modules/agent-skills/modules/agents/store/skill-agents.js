import skillAgentsAPI from '../api/skillAgents';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    name: '',
    team: {},
    capacity: 10,
    enabled: true,
  },
};

const skillAgents = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(skillAgentsAPI)
  .generateAPIActions()
  .getModule();

export default skillAgents;
