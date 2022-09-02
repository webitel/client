import FlowAPI from '../api/flow';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';
import filters from '../modules/filters/store/filters';

const resettableState = {
  itemInstance: {
    name: '',
    schema: '[]',
    payload: {},
    type: '',
    editor: false,
  },
};

const state = {
  fields: ['id'].concat(headers.map((header) => header.field)),
};

const flow = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(FlowAPI)
  .setChildModules({ filters })
  .generateAPIActions()
  .getModule({ state });

export default flow;
