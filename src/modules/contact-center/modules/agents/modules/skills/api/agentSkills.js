import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  handleUnauthorized,
  merge, mergeEach, notify, sanitize, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import { AgentSkillServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const agentSkillService = new AgentSkillServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['capacity', 'agentId', 'skill', 'enabled'];

const defaultObject = {
  skill: {},
  capacity: 0,
  enabled: false,
};

const getAgentSkillsList = async (params) => {
  const fieldsToSend = ['page', 'size', 'search', 'sort', 'fields', 'id', 'parentId'];

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    parentId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    sanitize(fieldsToSend),
  ]);

  try {
    const response = await agentSkillService.searchAgentSkill(
      parentId,
      page,
      size,
      search,
      sort,
      fields,
      id,
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

const getAgentSkill = async ({ parentId, itemId: id }) => {
  try {
    const response = await agentSkillService.readAgentSkill(parentId, id);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const addAgentSkill = async ({ parentId, itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentSkillService.createAgentSkill(parentId, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const patchAgentSkill = async ({ parentId, id, changes }) => {
  const item = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentSkillService.patchAgentSkill(parentId, id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const updateAgentSkill = async ({ parentId, itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await agentSkillService.updateAgentSkill(parentId, id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const deleteAgentSkill = async ({ parentId, id }) => {
  try {
    const response = await agentSkillService.deleteAgentSkill(parentId, id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const AgentSkillsAPI = {
  getList: getAgentSkillsList,
  get: getAgentSkill,
  add: addAgentSkill,
  patch: patchAgentSkill,
  update: updateAgentSkill,
  delete: deleteAgentSkill,
};

export default AgentSkillsAPI;
