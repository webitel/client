import ResInGroupAPI from '../../../../api/contact-center/resourceGroups/resInGroup';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const resettableItemState = {
  itemInstance: {
    resource: {},
  },
};

const resInGroup = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(ResInGroupAPI)
  .generateAPIActions()
  .getModule();

export default resInGroup;
