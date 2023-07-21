import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import applyTransform, {
  handleUnauthorized,
  merge, mergeEach, notify,
  snakeToCamel,
  starToSearch
} from '@webitel/ui-sdk/src/api/transformers';
import { getDefaultGetListResponse, getDefaultGetParams } from '@webitel/ui-sdk/src/api/defaults';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const getQueueAgentsList = async (params) => {
  const defaultObject = {
    name: '',
    status: '',
    supervisor: {},
    skills: [],
  };

  const fields = ['id', 'name', 'status', 'supervisor', 'skills'];

  const {
    page = 1,
    size = 10,
    search,
    sort,
    parentId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await agentService.searchAgent(
      page,
      size,
      search,
      sort,
      fields,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      parentId,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const QueueAgentsAPI = {
  getList: getQueueAgentsList,
};

export default QueueAgentsAPI;
