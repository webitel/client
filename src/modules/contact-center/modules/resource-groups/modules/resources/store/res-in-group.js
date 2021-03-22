import ResInGroupAPI from '../api/resInGroup';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    resource: {},
  },
};

const resInGroup = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(ResInGroupAPI)
  .generateAPIActions()
  .getModule();

export default resInGroup;
