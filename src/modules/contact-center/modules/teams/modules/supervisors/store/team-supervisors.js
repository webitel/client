import TeamSupervisorsAPI from '../api/teamSupervisors';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

const resettableItemState = {
  itemInstance: {
    agent: {},
  },
};

const teamSupervisors = new NestedObjectStoreModule({ resettableItemState })
  .attachAPIModule(TeamSupervisorsAPI)
  .generateAPIActions()
  .getModule();

export default teamSupervisors;
