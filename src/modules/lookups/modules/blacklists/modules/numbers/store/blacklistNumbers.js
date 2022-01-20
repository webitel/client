import BlacklistNumbersAPI from '../api/blacklistNumbers';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';
import headers from './_internals/headers';

const resettableItemState = {
  itemInstance: {
    number: '',
    description: '',
  },
};

const blacklistNumbers = new NestedObjectStoreModule({ resettableItemState, headers })
  .attachAPIModule(BlacklistNumbersAPI)
  .generateAPIActions()
  .getModule();

export default blacklistNumbers;
