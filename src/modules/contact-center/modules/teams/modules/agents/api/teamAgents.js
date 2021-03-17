import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';
import SDKGetter from '../../../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKPatcher from '../../../../../../../app/api/BaseAPIServices/Patcher/SDKPatcher';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  name: '',
  supervisor: {},
  skills: [],
};

const getTeamAgents = (getList) => function ({
                                               parentId,
                                               page = 1,
                                               size = 10,
                                               search,
                                             }) {
  // parent id == team id
  if (!parentId) return;
  const isSupervisor = false;
  const fields = ['id', 'name', 'supervisor', 'skills'];
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, undefined, parentId, undefined, undefined, isSupervisor];
  // eslint-disable-next-line consistent-return
  return getList(params);
};

const agentGetterResponseHandler = (agent) => ({ agent });

const listGetter = new SDKListGetter(agentService.searchAgent, { defaultListObject })
  .setGetListMethod(getTeamAgents);
const itemGetter = new SDKGetter(agentService.readAgent, {
  itemResponseHandler: agentGetterResponseHandler,
});
const itemPatcher = new SDKPatcher(agentService.patchAgent);

export const getTeamAgentsList = (params) => listGetter.getList(params);
export const getTeamAgent = (params) => itemGetter.getItem(params);
export const addTeamAgent = ({ parentId, itemInstance }) => {
  const { id } = itemInstance.agent;
  const changes = { team: { id: parentId } };
  return itemPatcher.patchItem({ id, changes });
};
export const deleteTeamAgent = ({ id }) => {
  const changes = { team: { id: null } };
  return itemPatcher.patchItem({ id, changes });
};
export const updateTeamAgent = async ({ parentId, itemId, itemInstance }) => {
  try {
    await addTeamAgent({ parentId, itemInstance });
    await deleteTeamAgent({ id: itemId });
  } catch (err) {
    throw err;
  }
};

export default {
  getList: getTeamAgentsList,
  get: getTeamAgent,
  add: addTeamAgent,
  update: updateTeamAgent,
  delete: deleteTeamAgent,
};
