import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import TeamsAPI from '../api/teams';
import agents from '../modules/agents/store/team-agents';
import flow from '../modules/flow/store/team-flows';
import hooks from '../modules/hooks/store/team-hooks';
import supervisors from '../modules/supervisors/store/team-supervisors';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
    strategy: {},
    admin: [],
    maxNoAnswer: 3,
    wrapUpTime: 15,
    noAnswerDelayTime: 30,
    taskAcceptTimeout: 30,
    callTimeout: 60,
    inviteChatTimeout: 30,
    screenControl: false,
  },
};

const actions = {
  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch(
      'ccenter/teams/supervisors/RESET_STATE',
      {},
      { root: true },
    );
    context.dispatch('ccenter/teams/agents/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/teams/hooks/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/teams/flows/RESET_STATE', {}, { root: true });
  },
};

const PERMISSIONS_API_URL = '/call_center/teams';
const permissions = new PermissionsStoreModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const teams = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(TeamsAPI)
  .generateAPIActions()
  .setChildModules({ supervisors, agents, hooks, flow, permissions })
  .getModule({ actions });

export default teams;
