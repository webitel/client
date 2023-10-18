import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  merge,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name', 'description', 'strategy', 'admin', 'maxNoAnswer', 'wrapUpTime',
  'noAnswerDelayTime', 'callTimeout', 'inviteChatTimeout',
];

const getTeamsList = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    strategy,
    adminId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await teamService.searchAgentTeam(
      page,
      size,
      search,
      sort,
      fields,
      id,
      strategy,
      adminId,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getTeam = async ({ itemId: id }) => {
  const defaultObject = {
    name: '',
    strategy: {},
    admin: [],
    description: '',
    busyDelayTime: 0,
    callTimeout: 0,
    maxNoAnswer: 0,
    noAnswerDelayTime: 0,
    inviteChatTimeout: 0,
    rejectDelayTime: 0,
    wrapUpTime: 0,
  };

  try {
    const response = await teamService.readAgentTeam(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const addTeam = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await teamService.createAgentTeam(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const updateTeam = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await teamService.updateAgentTeam(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const deleteTeam = async ({ id }) => {
  try {
    const response = await teamService.deleteAgentTeam(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getTeamsLookup = (params) => getTeamsList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const TeamsAPI = {
  getList: getTeamsList,
  get: getTeam,
  add: addTeam,
  update: updateTeam,
  delete: deleteTeam,
  getLookup: getTeamsLookup,
};

export default TeamsAPI;
