import FlowAPI from '../../../../api/routing/flow/flow';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';

const resettableState = {
  itemInstance: {
    name: '',
    schema: '[]',
  },
};

const flow = new DefaultModule(resettableState)
  .attachAPIModule(FlowAPI)
  .generateAPIActions()
  .getModule();

export default flow;
