import TeamAgentsAPI from '../api/teamAgents';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

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

const teamAgents = new NestedObjectStoreModule(null, resettableItemState)
  .attachAPIModule(TeamAgentsAPI)
  .generateAPIActions()
  .getModule({ getters });

export default teamAgents;
