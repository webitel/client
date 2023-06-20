import { AgentServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkPatcherApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  name: '',
  team: {},
  capacity: 10,
  enabled: true,
};

const getSkillAgents = (getList) => function ({
                                               parentId,
                                               page = 1,
                                               size = 10,
                                               search,
                                               sort,
                                             }) {
  // parent id == team id
  if (!parentId) return;
  const fields = ['id', 'name', 'team', 'capacity', 'enabled'];
  const params = [page, size, search, sort, fields, undefined, undefined, undefined, parentId];
  // eslint-disable-next-line consistent-return
  return getList(params);
};

const agentGetterResponseHandler = (agent) => ({ agent });

const listGetter = new SdkListGetterApiConsumer(agentService.searchAgent, { defaultListObject })
  .setGetListMethod(getSkillAgents);
const itemGetter = new SdkGetterApiConsumer(agentService.readAgent, {
  itemResponseHandler: agentGetterResponseHandler,
});
const itemPatcher = new SdkPatcherApiConsumer(agentService.patchAgent);

const getSkillAgentsList = (params) => listGetter.getList(params);
const getSkillAgent = (params) => itemGetter.getItem(params);
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

const SkillAgentsAPI = {
  getList: getSkillAgentsList,
  get: getSkillAgent,
  add: addTeamAgent,
  update: updateTeamAgent,
  delete: deleteTeamAgent,
};

export default SkillAgentsAPI;
