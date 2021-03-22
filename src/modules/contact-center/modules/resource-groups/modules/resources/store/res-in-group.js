import ResInGroupAPI from '../api/resInGroup';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

const resettableItemState = {
  itemInstance: {
    resource: {},
  },
};

const resInGroup = new NestedObjectStoreModule({ resettableItemState })
  .attachAPIModule(ResInGroupAPI)
  .generateAPIActions()
  .getModule();

export default resInGroup;
