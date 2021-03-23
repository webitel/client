import TeamAgentsAPI from '../api/teamAgents';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    agent: {},
  },
};

const getters = {
  GET_ITEM_SKILLS: (state) => (id) => {
    const item = state.dataList.find((item) => item.id === id);
    return item.skills;
  },
};

const teamAgents = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(TeamAgentsAPI)
  .generateAPIActions()
  .getModule({ getters });

export default teamAgents;
