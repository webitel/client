import ResDisplayAPI from '../api/resourceDisplay';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

const resettableItemState = {
  itemInstance: {
    display: '',
  },
};

const resDisplay = new NestedObjectStoreModule(null, resettableItemState)
  .attachAPIModule(ResDisplayAPI)
  .generateAPIActions()
  .getModule();

export default resDisplay;
