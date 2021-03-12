import ResDisplayAPI from '../../../../api/contact-center/resources/resourceDisplay';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const resettableItemState = {
  itemInstance: {
    display: '',
  },
};

const resDisplay = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(ResDisplayAPI)
  .generateAPIActions()
  .getModule();

export default resDisplay;
