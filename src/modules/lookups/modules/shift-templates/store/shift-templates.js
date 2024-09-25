import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import ShiftTemplatesAPI from '../api/shiftTemplates.js';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
    times: [],
  },
};

const shiftTemplates = new ObjectStoreModule({ resettableState, headers })
.attachAPIModule(ShiftTemplatesAPI)
.generateAPIActions()
.getModule();

export default shiftTemplates;
