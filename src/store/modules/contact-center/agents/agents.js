import skills from './agent-skills';
import history from './history';
import queues from './agent-queues';
import subordinates from './agent-subordinates';
import AgentsAPI from '../../../../api/contact-center/agents/agents';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import DefaultPermissionsModule from '../../../BaseModules/defaults/DefaultPermissionsModule';

const resettableState = {
  itemInstance: {
    user: {},
    team: {},
    supervisor: {},
    auditor: {},
    region: {},
    progressiveCount: 1,
    chatCount: 1,
    isSupervisor: false,
  },
};

const actions = {
  RESET_ITEM_STATE: async (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('ccenter/agents/queues/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/agents/skills/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/agents/subordinates/RESET_STATE', {}, { root: true });
  },
};

const PERMISSIONS_API_URL = '/call_center/agents';
const permissions = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const agents = new DefaultModule(resettableState)
  .attachAPIModule(AgentsAPI)
  .generateAPIActions()
  .setChildModules({ history, skills, queues, subordinates, permissions })
  .getModule({ actions });

export default agents;

