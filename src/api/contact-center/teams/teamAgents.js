import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKItemGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  name: '',
  supervisor: {},
  skills: [],
  _isSelected: false,
};

const agentGetterResponseHandler = (agent) => ({ agent });

const listGetter = new SDKListGetter(agentService.searchAgent, defaultListObject);
const itemGetter = new SDKItemGetter(agentService.readAgent, null,
  agentGetterResponseHandler);
const itemPatcher = new SDKPatcher(agentService.patchAgent);

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

export const getTeamAgentsList = (params) => (
  listGetter
    .setGetListMethod(getTeamAgents)
    .getList(params)
);
export const getTeamAgent = ({ itemId }) => itemGetter.getItem(itemId);
export const addTeamAgent = ({ parentId, itemInstance }) => {
  const { id } = itemInstance.agent;
  const changes = { team: { id: parentId } };
  return itemPatcher.patchItem(id, changes);
};
export const deleteTeamAgent = ({ id }) => {
  const changes = { team: { id: null } };
  return itemPatcher.patchItem(id, changes);
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
