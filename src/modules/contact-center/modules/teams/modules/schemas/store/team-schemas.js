import NestedObjectStoreModule
  from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import TeamSchemasAPI from '../api/teamSchemas';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    name: '',
    description: '',
    enabled: true,
    schema: {},
  },
};

const teamSchemas = new NestedObjectStoreModule({ resettableItemState, headers })
.attachAPIModule(TeamSchemasAPI)
.generateAPIActions()
.getModule();

export default teamSchemas;
