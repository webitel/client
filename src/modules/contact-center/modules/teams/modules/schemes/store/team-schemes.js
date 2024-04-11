import NestedObjectStoreModule
  from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import TeamSchemesAPI from '../api/teamSchemes';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    agent: {},
  },
};

const teamSchemes = new NestedObjectStoreModule({ resettableItemState, headers })
.attachAPIModule(TeamSchemesAPI)
.generateAPIActions()
.getModule();

export default teamSchemes;
