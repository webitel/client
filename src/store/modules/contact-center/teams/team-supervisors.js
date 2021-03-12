import TeamSupervisorsAPI from '../../../../api/contact-center/teams/teamSupervisors';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const resettableItemState = {
  itemInstance: {
    agent: {},
  },
};

const teamSupervisors = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(TeamSupervisorsAPI)
  .generateAPIActions()
  .getModule();

export default teamSupervisors;
