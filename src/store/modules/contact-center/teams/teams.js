import supervisors from './team-supervisors';
import agents from './team-agents';
import TeamsAPI from '../../../../api/contact-center/teams/teams';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import DefaultPermissionsModule from '../../../BaseModules/defaults/DefaultPermissionsModule';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
    strategy: {},
    admin: {},
    maxNoAnswer: 3,
    wrapUpTime: 15,
    noAnswerDelayTime: 30,
    callTimeout: 60,
  },
};

const actions = {
  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('ccenter/teams/supervisors/RESET_STATE', {}, { root: true });
    context.dispatch('ccenter/teams/agents/RESET_STATE', {}, { root: true });
  },
};

const PERMISSIONS_API_URL = '/call_center/teams';
const permissions = new DefaultPermissionsModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const teams = new DefaultModule(resettableState)
  .attachAPIModule(TeamsAPI)
  .generateAPIActions()
  .setChildModules({ supervisors, agents, permissions })
  .getModule({ actions });

export default teams;
