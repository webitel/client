import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  name: '',
  supervisor: {},
  skills: [],
  _isSelected: false,
};

const listGetter = new SDKListGetter(agentService.searchAgent, defaultListObject);

const getQueueAgents = (getList) => function ({
                                                    parentId,
                                                    page = 1,
                                                    size = 10,
                                                    search,
                                                  }) {
  // parent id == queue id
  if (!parentId) return;
  const fields = ['id', 'name', 'supervisor', 'skills'];
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, parentId];
  // eslint-disable-next-line consistent-return
  return getList(params);
};

export const getQueueAgentsList = (params) => (
  listGetter
    .setGetListMethod(getQueueAgents)
    .getList(params)
);

export default {
  getList: getQueueAgentsList,
};
