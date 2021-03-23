import QueueAgentsAPI from '../api/queueAgents';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const getters = {
  GET_ITEM_SKILLS: (state) => (id) => {
    const item = state.dataList.find((item) => item.id === id);
    return item.skills;
  },
};

const queueAgents = new NestedObjectStoreModule({ headers })
  .attachAPIModule(QueueAgentsAPI)
  .generateAPIActions()
  .getModule({ getters });

export default queueAgents;
