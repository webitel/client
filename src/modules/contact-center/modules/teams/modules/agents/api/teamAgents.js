import { AgentServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkPatcherApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/old/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  name: '',
  status: '',
  supervisor: {},
  skills: [],
};

const getTeamAgents = (getList) => function ({
                                               parentId,
                                               page = 1,
                                               size = 10,
                                               search,
                                               sort,
                                             }) {
  // parent id == team id
  if (!parentId) return;
  const fields = ['id', 'name', 'status', 'supervisor', 'skills'];
  const params = [page, size, search, sort, fields, undefined, undefined, undefined, parentId];
  // eslint-disable-next-line consistent-return
  return getList(params);
};

const agentGetterResponseHandler = (agent) => ({ agent });

const listGetter = new SdkListGetterApiConsumer(agentService.searchAgent, { defaultListObject })
  .setGetListMethod(getTeamAgents);
const itemGetter = new SdkGetterApiConsumer(agentService.readAgent, {
  itemResponseHandler: agentGetterResponseHandler,
});
const itemPatcher = new SdkPatcherApiConsumer(agentService.patchAgent);

const getTeamAgentsList = (params) => listGetter.getList(params);
const getTeamAgent = (params) => itemGetter.getItem(params);
const addTeamAgent = ({ parentId, itemInstance }) => {
  const { id } = itemInstance.agent;
  const changes = { team: { id: parentId } };
  return itemPatcher.patchItem({ id, changes });
};
const deleteTeamAgent = ({ id }) => {
  const changes = { team: { id: null } };
  return itemPatcher.patchItem({ id, changes });
};
const updateTeamAgent = async ({ parentId, itemId, itemInstance }) => {
  try {
    await addTeamAgent({ parentId, itemInstance });
    await deleteTeamAgent({ id: itemId });
  } catch (err) {
    throw err;
  }
};

const TeamAgentsAPI = {
  getList: getTeamAgentsList,
  get: getTeamAgent,
  add: addTeamAgent,
  update: updateTeamAgent,
  delete: deleteTeamAgent,
};

export default TeamAgentsAPI;
