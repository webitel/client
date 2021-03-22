import BlacklistNumbersAPI from '../api/blacklistNumbers';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

const resettableItemState = {
  itemInstance: {
    number: '',
    description: '',
  },
};

const blacklistNumbers = new NestedObjectStoreModule({ resettableItemState })
  .attachAPIModule(BlacklistNumbersAPI)
  .generateAPIActions()
  .getModule();

export default blacklistNumbers;
