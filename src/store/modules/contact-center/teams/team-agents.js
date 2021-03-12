import TeamAgentsAPI from '../../../../api/contact-center/teams/teamAgents';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

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

const teamAgents = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(TeamAgentsAPI)
  .generateAPIActions()
  .getModule({ getters });

export default teamAgents;
