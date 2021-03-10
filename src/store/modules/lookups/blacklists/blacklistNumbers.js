import BlacklistNumbersAPI from '../../../../api/lookups/blacklists/blacklistNumbers';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const resettableItemState = {
  itemInstance: {
    number: '',
    description: '',
  },
};

const blacklistNumbers = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(BlacklistNumbersAPI)
  .generateAPIActions()
  .getModule();

export default blacklistNumbers;
