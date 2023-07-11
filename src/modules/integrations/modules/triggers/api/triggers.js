import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import { TriggerServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake, handleUnauthorized,
  merge, notify, snakeToCamel,
  starToSearch, sanitize, mergeEach,
} from '@webitel/ui-sdk/src/api/transformers';
import deepCopy from 'deep-copy';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import TriggerTypes from '../lookups/TriggerTypes.lookup';

const triggersService = new TriggerServiceApiFactory(configuration, '', instance);

const doNotConvertKeys = ['variables']
const fieldsToSend = [
  'description',
  'enabled',
  'id',
  'name',
  'schema',
  'timeout',
  'timezone',
  'type',
  'variables',
  'expression',
];


const preRequestHandler = (item) => {
  item.variables = item.variables.reduce((variables, variable) => {
    if (!variable.key) return variables;
    return { ...variables, [variable.key]: variable.value };
  }, {});
  return {
    ...item,
    type: item.type.value,
  };
};

const getList = async (params) => {
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
    schemaId,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await triggersService.searchTrigger(
      page,
      size,
      search,
      sort,
      fields,
      id,
      schemaId,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
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

const get = async ({ itemId: id }) => {
  const defaultObject = {
    timeout: 0,
    variables: {},
  };

  const responseHandler = (response) => {
    if (response.variables) {
      const copy = deepCopy(response);
      copy.variables = Object.keys(copy.variables)
        .map((key) => ({
          key,
          value: copy.variables[key],
        }));
    }
    return {
      ...response,
      type: TriggerTypes.find(({ value }) => value === response.type),
    };
  };

  try {
    const response = await triggersService.readTrigger(id);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
      merge(defaultObject),
      responseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const add = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await triggersService.createTrigger(item);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const patch = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await triggersService.patchTrigger(id, body);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const update = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(doNotConvertKeys),
  ]);
  try {
    const response = await triggersService.updateTrigger(id, item);
    return applyTransform(response.data, [
      snakeToCamel(doNotConvertKeys),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const deleteItem = async ({ id }) => {
  try {
    const response = await triggersService.deleteTrigger(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const getLookup = (params) => getList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const startTrigger = async (params, item) => {
  const url = `/trigger/${item.id}/job`;

  try {
    const response = await instance.post(url, item);
    eventBus.$emit('notification', { type: 'info', text: 'Successfully ran' });
    return response;
  } catch (err) {
    throw err;
  }
};

const TriggersAPI = {
  getList,
  get,
  add,
  patch,
  update,
  delete: deleteItem,
  getLookup,
  start: startTrigger,
};

export default TriggersAPI;
