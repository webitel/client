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
import { SkillServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const skillService = new SkillServiceApiFactory(configuration, '', instance);

const defaultObject = {
  agent: {},
  skill: {},
  team: {},
  capacity: 10,
  enabled: false,
};

const getAgentSkillsList = async (params) => {
  const {
    parentId,
    page,
    size,
    search,
    sort,
    fields,
    id,
    agentId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await skillService.searchSkillAgent(
      parentId,
      page,
      size,
      search,
      sort,
      fields,
      id,
      agentId,
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
    const response = await skillService.readSkill(id, parentId);
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

const fieldsToSend = ['capacity', 'skill', 'team', 'enabled', 'id', 'agent'];

const addAgentSkill = async ({ id, itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await skillService.createSkill(id, item);
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

const patchAgentSkill = async ({ parentId, changes, id }) => {
  const sanitizedChanges = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  const itemId = { id: [id] };
  try {
    const response = await skillService.patchSkillAgent(
      parentId,
      { ...sanitizedChanges, ...itemId },
    );
    console.log('response', response.data);
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

const updateAgentSkill = async ({ id, itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await skillService.updateSkill(id, item);
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
  const itemId = { id: [id] };
  try {
    const response = await skillService.deleteSkillAgent(
      parentId,
      itemId,
    );
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
