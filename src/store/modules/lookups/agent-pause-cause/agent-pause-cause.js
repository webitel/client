import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import PauseCauseAPI from '../../../../api/lookups/agentPauseCause/agentPauseCause';

const resettableState = {
  itemInstance: {
    name: '',
    limitMin: 60,
    allowAdmin: true,
    allowSupervisor: true,
    allowAgent: true,
    description: '',
  },
};

const actions = {
  CHANGE_ADMIN_PERMISSIONS: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'allowAdmin', ...payload }),
  CHANGE_SUPERVISOR_PERMISSIONS: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'allowSupervisor', ...payload }),
  CHANGE_AGENT_PERMISSIONS: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'allowAgent', ...payload }),
};

const pauseCause = new DefaultModule(resettableState)
  .attachAPIModule(PauseCauseAPI)
  .generateAPIActions()
  .getModule({ actions });

export default pauseCause;
