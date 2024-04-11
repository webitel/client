import { AgentServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  merge, mergeEach,
  notify,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const getTeamSchemesList = async (params) => {
  const fields = ['id', 'name', 'status', 'supervisor', 'skills'];

  const defaultObject = {
    name: '',
    status: '',
    supervisor: {},
    skills: [],
  };

  const {
    parentId,
    page = 1,
    size = 10,
    search,
    sort,
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
      notify,
    ]);
  }
};

const getTeamSchemes = async ({ itemId: id }) => {
  const responseHandler = (agent) => ({ agent });

  try {
    const response = await agentService.readAgent(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      responseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const addTeamSchemes = ({ parentId, itemInstance }) => {
  const { id } = itemInstance.agent;
  const changes = { team: { id: parentId } };
  return patchAgent({ id, changes });
};

const updateTeamSchemes = async ({ parentId, itemId, itemInstance }) => {
  try {
    await addTeamAgent({ parentId, itemInstance });
    await deleteTeamAgent({ id: itemId });
  } catch (err) {
    throw err;
  }
};

const patchSchemes = async ({ id, changes }) => {
  const item = applyTransform(changes, [
    camelToSnake(),
  ]);
  try {
    const response = await agentService.patchAgent(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const deleteTeamSchemes = ({ id }) => {
  const changes = { team: { id: null } };
  return patchAgent({ id, changes });
};

const TeamAgentsAPI = {
  getList: getTeamSchemesList,
  get: getTeamSchemes,
  add: addTeamSchemes,
  update: updateTeamSchemes,
  putch: patchSchemes,
  delete: deleteTeamSchemes,
};

export default TeamAgentsAPI;
