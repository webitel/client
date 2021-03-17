import skills from '../modules/skills/store/agent-skills';
import queues from '../modules/queues/store/agent-queues';
import subordinates from '../modules/subordinates/store/agent-subordinates';
import AgentsAPI, { getAgentHistory } from '../api/agents';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule';
import HistoryStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/HistoryStoreModule';

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
const permissions = new PermissionsStoreModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const history = new HistoryStoreModule()
  .generateGetListAction(getAgentHistory)
  .getModule();

const agents = new ObjectStoreModule(resettableState)
  .attachAPIModule(AgentsAPI)
  .generateAPIActions()
  .setChildModules({ history, skills, queues, subordinates, permissions })
  .getModule({ actions });

export default agents;

