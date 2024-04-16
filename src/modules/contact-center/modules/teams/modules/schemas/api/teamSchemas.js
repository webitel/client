import { TeamTriggerServiceApi } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  merge, mergeEach,
  notify, sanitize,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const schemaService = new TeamTriggerServiceApi(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'enabled', 'description'];

const preRequestHandler = (parentId) => (item) => ({
  ...item,
  teamId: parentId,
});

const getTeamSchemasList = async (params) => {
  const defaultObject = {
    enabled: false,
  };

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    enabled,
    parentId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await schemaService.searchTeamTrigger(
      parentId,
      page,
      size,
      search,
      sort,
      fields,
      enabled,
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
      notify,
    ]);
  }
};

const getTeamSchema = async ({ parentId, itemId: id }) => {
  const defaultObject = {
    name: '',
    description: '',
    enabled: false,
    schema: {},
  };

  try {
    const response = await schemaService.readTeamTrigger(parentId, id);
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

const addTeamSchema = async ({ parentId, itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler(parentId),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await schemaService.createTeamTrigger(parentId, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const patchTeamSchema = async ({ changes, id, parentId }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await schemaService.patchTeamTrigger(parentId, id, body);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const updateTeamSchema = async ({ itemInstance, itemId: id, parentId }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler(parentId),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await schemaService.updateTeamTrigger(parentId, id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const deleteTeamSchema = async ({ parentId, id }) => {
  try {
    const response = await schemaService.deleteTeamTrigger(parentId, id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const TeamAgentsAPI = {
  getList: getTeamSchemasList,
  get: getTeamSchema,
  add: addTeamSchema,
  update: updateTeamSchema,
  patch: patchTeamSchema,
  delete: deleteTeamSchema,
};

export default TeamAgentsAPI;
