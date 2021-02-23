import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  supervisor: {},
  skills: [],
};

const listGetter = new SDKListGetter(agentService.searchAgent, defaultListObject);

const getTeamAgents = (getList) => function ({
                                                    parentId,
                                                    page = 1,
                                                    size = 10,
                                                    search,
                                                  }) {
  // parent id == team id
  const isSupervisor = false;
  const fields = ['id', 'user', 'supervisor', 'skills'];
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, undefined, parentId, undefined, undefined, isSupervisor];
  return getList(params);
};

export const getTeamAgentsList = (params) => (
  listGetter
    .setGetListMethod(getTeamAgents)
    .getList(params)
);

export default {
  getList: getTeamAgentsList,
};
